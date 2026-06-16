import NavContainer from "./NavContainer";

const SystemLayout = ({ children }) => {
  return (
    <div className="system-shell">
      <NavContainer />
      {children}
    </div>
  );
};

export default SystemLayout;
