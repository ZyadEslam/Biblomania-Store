/**
 * Atlas SRV + direct-connection helpers for networks that block SRV DNS or TLS inspection.
 */
const ATLAS_CLUSTER_SHARDS = {
  "cluster0.hfaxmnx.mongodb.net": {
    hosts: [
      "ac-hymeq7v-shard-00-00.hfaxmnx.mongodb.net",
      "ac-hymeq7v-shard-00-01.hfaxmnx.mongodb.net",
      "ac-hymeq7v-shard-00-02.hfaxmnx.mongodb.net",
    ],
    replicaSet: "atlas-hymeq7v-shard-0",
  },
};

function parseQueryParams(query = "") {
  const params = new URLSearchParams();

  for (const part of query.split("&")) {
    if (!part) continue;
    const [key, value] = part.split("=");
    if (key && value) {
      params.set(key, value);
    }
  }

  return params;
}

function buildDirectUri(credentials, host, params) {
  const connectionParams = new URLSearchParams({
    ssl: "true",
    authSource: "admin",
    directConnection: "true",
  });

  for (const [key, value] of params.entries()) {
    if (key !== "replicaSet") {
      connectionParams.set(key, value);
    }
  }

  return `mongodb://${credentials}@${host}:27017/?${connectionParams.toString()}`;
}

function buildReplicaSetUri(credentials, cluster, params) {
  const hostList = cluster.hosts.map((host) => `${host}:27017`).join(",");
  const connectionParams = new URLSearchParams({
    ssl: "true",
    replicaSet: cluster.replicaSet,
    authSource: "admin",
    retryWrites: "true",
    w: "majority",
  });

  for (const [key, value] of params.entries()) {
    connectionParams.set(key, value);
  }

  return `mongodb://${credentials}@${hostList}/?${connectionParams.toString()}`;
}

export function resolveMongoUri(uri) {
  const explicitUri = process.env.MONGODB_URI_STANDARD?.trim();
  if (explicitUri) {
    return explicitUri;
  }

  if (!uri) {
    return uri;
  }

  if (uri.startsWith("mongodb+srv://")) {
    const match = uri.match(/^mongodb\+srv:\/\/([^@]+)@([^/?]+)(?:\?(.*))?$/);
    if (!match) {
      return uri;
    }

    const [, credentials, clusterHost, query = ""] = match;
    const cluster = ATLAS_CLUSTER_SHARDS[clusterHost];

    if (!cluster) {
      return uri;
    }

  const params = parseQueryParams(query);
  return buildDirectUri(credentials, cluster.hosts.at(-1), params);
  }

  if (uri.includes("directConnection=true")) {
    return uri;
  }

  return uri;
}

export async function resolveWritableMongoUri(uri, driverOptions = {}) {
  const baseUri = resolveMongoUri(uri);

  if (!baseUri?.includes("directConnection=true")) {
    return baseUri;
  }

  const match = baseUri.match(/^mongodb:\/\/([^@]+)@([^/:?]+)/);
  if (!match) {
    return baseUri;
  }

  const [, credentials] = match;
  const query = baseUri.split("?")[1] || "";
  const params = parseQueryParams(query);

  const cluster = Object.values(ATLAS_CLUSTER_SHARDS).find((entry) =>
    entry.hosts.some((host) => baseUri.includes(host.split(".")[0]))
  );

  if (!cluster) {
    return baseUri;
  }

  const { MongoClient } = await import("mongodb");
  const probeOptions = {
    family: 4,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    ...driverOptions,
  };

  for (const host of cluster.hosts) {
    const probeUri = buildDirectUri(credentials, host, new URLSearchParams());

    const client = new MongoClient(probeUri, probeOptions);

    try {
      await client.connect();
      const hello = await client.db("admin").command({ hello: 1 });
      await client.close();

      if (hello.isWritablePrimary) {
        return buildDirectUri(credentials, host, params);
      }
    } catch {
      try {
        await client.close();
      } catch {
        // ignore close errors on failed probe
      }
    }
  }

  if (process.env.MONGODB_USE_REPLICA_SET === "true") {
    const clusterHost = Object.keys(ATLAS_CLUSTER_SHARDS)[0];
    const clusterConfig = ATLAS_CLUSTER_SHARDS[clusterHost];
    return buildReplicaSetUri(credentials, clusterConfig, params);
  }

  throw new Error(
    "Could not find a writable MongoDB primary. Check Atlas cluster status and network access."
  );
}
