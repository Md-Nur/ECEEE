import logo from "@/public/ru-logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content">
      <aside>
        <Image alt="ECEE" src={logo} />
        <p className="font-bold">
          Electronics Club <br />
          Electrical & Electronic Engineering, University of Rajshahi
        </p>
        <p>Copyright &copy; 2024 - All right reserved</p>
      </aside>
      
    </footer>
  );
};

export default Footer;
