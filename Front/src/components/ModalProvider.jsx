import { createContext, useState } from "react";
import Modal from "./Generics/Modal";

export const modalContext = createContext(null);

export default function ModalProvider({ children }) {
  const [modalData, setModalData] = useState([]);

  const openModal = (
    el,
    closeOnOverlayClick = true,
    modalClassName = null,
    modalStyle = null,
  ) => {
    console.log();
    setModalData([
      ...modalData,
      {
        elToRender: el,
        closeOnOverlayClick,
        modalClassName,
        modalStyle,
      },
    ]);
  };

  // elGenerator (promiseRes, closeModal) => elm
  // What happens if promise is not resolved and modal is closed (so component
  // cannot resolve the promise anymore)?
  const askModal = (
    elGenerator,
    closeOnOverlayClick = true,
    modalClassName = null,
    modalStyle = null,
  ) => {
    return new Promise((res) => {
      setModalData([
        ...modalData,
        {
          elGenerator: elGenerator,
          closeOnOverlayClick,
          modalClassName,
          modalStyle,

          promiseRes: res,
        },
      ]);
    });
  };

  const closeAt = (idx) => {
    setModalData(modalData.toSpliced(idx, 1));
  };

  return (
    <>
      <modalContext.Provider value={{ openModal, askModal }}>
        {children}
        {modalData?.map((modal, idx) => {
          return (
            <Modal
              isOpen={modal != null}
              onClose={() => closeAt(idx)}
              closeOnOverlayClick={modalData?.closeOnOverlayClick}
              key={idx}

              className={modal?.modalClassName}
              style={modal?.modalStyle}
            >
              {modal?.elGenerator
                ? modal.elGenerator(modal.promiseRes, () => closeAt(idx))
                : modal?.elToRender}
            </Modal>
          );
        })}
      </modalContext.Provider>
    </>
  );
}
