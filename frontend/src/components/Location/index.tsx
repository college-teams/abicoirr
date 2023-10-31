import LocationImg from "/assets/location1.webp";
import { LocateButton } from "./styled";

const Location = () => {
  return (
    <div className="relative">
      <img src={LocationImg} alt="locationImg" />
      <LocateButton
        href="https://www.google.com/maps/place/Abi+Coir/@10.9354098,77.4060523,17z/data=!3m1!4b1!4m20!1m13!4m12!1m4!2m2!1d77.0605056!2d11.0133248!4e1!1m6!1m2!1s0x3ba9a51083d26057:0x4addbdda8216dfbb!2sAbi+Coir!2m2!1d77.4086272!2d10.9354045!3m5!1s0x3ba9a51083d26057:0x4addbdda8216dfbb!8m2!3d10.9354045!4d77.4086272!16s%2Fg%2F11g1nrflcm?hl=en-IN&entry=ttu"
        target="_blank"
        rel={"noopener noreferrer"}
      >
        Locate our store
      </LocateButton>
    </div>
  );
};

export default Location;
