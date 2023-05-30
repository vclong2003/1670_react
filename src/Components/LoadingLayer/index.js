export default function LoadingLayer({ loading = false }) {
  return loading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0000008C",
        position: "fixed",
        zIndex: "200",
      }}>
      <div
        className="spinner-border text-primary"
        style={{ width: "3rem", height: "3rem", fontSize: "25px" }}
      />
    </div>
  ) : (
    ""
  );
}
