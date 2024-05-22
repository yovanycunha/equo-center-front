import Drawer from "@/components/Drawer/Drawer";
import { FC } from "react";
import HeaderLinks from "../HeaderLinks/HeaderLinks";
import { IHeaderMobileContentProps } from "./types";

const HeaderMobileContent: FC<IHeaderMobileContentProps> = (props) => {
  const handleOnClose = () => {
    props.onClose();
  };

  return (
    <Drawer fullScreen closeButton open={props.isOpen} onClose={handleOnClose}>
      <HeaderLinks onClick={handleOnClose} />
    </Drawer>
  );
};

export default HeaderMobileContent;
