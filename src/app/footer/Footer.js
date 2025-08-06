import Image from "next/image";

const Footer = () => {
  const styles = {
    backgroundImage: `
        radial-gradient(circle at 10% 90%, rgba(0, 255, 255, 0.1), transparent 30%),
        radial-gradient(circle at 90% 20%, rgba(0, 255, 255, 0.08), transparent 25%),
        linear-gradient(180deg, #0f1e36, #132d4d)
      `,
    backgroundColor: '#0f1e36',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
  };

  return <footer className="row-start-3 flex-wrap items-center justify-center" style={styles}>
    <div className="flex flex-row items-center justify-center">
      <Image src="/logo_sin_fondo.png" alt="logo" width={60} height={60} />
    </div>
    <p>Created by <a href="" target="_blank" rel="noopener noreferrer">Lab_ai</a></p>

  </footer >;
};

export default Footer;