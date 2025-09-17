import { EvilIcons } from "@expo/vector-icons";
import { createContext, ReactNode, useContext, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { s } from "react-native-size-matters";

interface ModalContextProps {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  showModal: () => {},
  hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const screenWidth = Dimensions.get("window").width;

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {visible && (
        <View style={styles.backdrop}>
          <View style={[styles.container, { width: screenWidth - 40 }]}>
            {modalContent}
            <Pressable onPress={hideModal} style={styles.closeBtn}>
              <EvilIcons name="close" size={40} color="#000" />
            </Pressable>
          </View>
        </View>
      )}
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    borderRadius: 16,
    padding: 20,
    height: "80%",
    backgroundColor: "white",
  },
  closeBtn: {
    position: "absolute",
    top: s(10),
    right: s(10),
  },
});
