import NavView from "./NavView";

const SystemLayout = ({ children }) => {
  return (
    <div className="system-shell">
      <NavView />
      {children}
    </div>
  );
};

export default SystemLayout;
