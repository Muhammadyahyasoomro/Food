export const Footer = ({ isDisabled }) => {
  return (
    <>
      {isDisabled ? (
        <div></div>
      ) : (
        <footer
          className="text-center"
          style={{
            backgroundColor: "red",
            width: "100%",
            borderLeft: 2,
            borderColor: "black",
            borderRight: 2,
            color: "white",
          }}
        >
          <p>this is unpublished BigBytes pages under construction</p>
        </footer>
      )}
    </>
  );
};
