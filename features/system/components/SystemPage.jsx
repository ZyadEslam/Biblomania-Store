import SystemFormsContainer from "./SystemFormsContainer";
import SystemDataPanelContainer from "./SystemDataPanelContainer";

const SystemPage = () => {
  return (
    <main className="system-grid">
      <SystemFormsContainer />
      <SystemDataPanelContainer />
    </main>
  );
};

export default SystemPage;
