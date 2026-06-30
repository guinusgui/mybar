import WaiterAuthScreen from "../formsScreens/waiterAuthScreen";

export default async function askWaiterAuth(askModal, dataRef = null) {
  return await askModal((res, closeModal) => {
    return (
      <WaiterAuthScreen
        dataRef={dataRef}
        onSubmit={() => {
          res(dataRef?.current?.getData());
          closeModal();
        }}
      />
    );
  });
}
