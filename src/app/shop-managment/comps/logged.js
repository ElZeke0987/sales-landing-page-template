export const getServerSideProps = async ({ req }) => {
    const cookie = req.headers.cookie || "";
    if (!cookie.includes("dev_auth=ok")) {
      return {
        redirect: {
          destination: "/shop-managment",
          permanent: false,
        },
      };
    }
  
    return { props: {} };
  };
  
  export default function Logged() {
    return <div>🎛 Bienvenido al panel privado</div>;
  }
    