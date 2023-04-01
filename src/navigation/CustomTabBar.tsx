import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    Alert, Modal,
    TextInput, Button,
    StyleSheet
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import RBSheet from 'react-native-raw-bottom-sheet';
import auth from '@react-native-firebase/auth'


function CustomtabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const refRBSheet = React.useRef<RBSheet>(null);
    const [password, setpassword] = useState("")


    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleOpenModal = () => {
        refRBSheet?.current?.close()
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setInputValue("")
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    const handleSubmit = async (password: string): Promise<void> => {
      //  console.log(`Input value: ${inputValue}`);
        try {
            const user = auth().currentUser

            const emailCredential = auth.EmailAuthProvider.credential
            if(user?.email !== null){

                const userCredential = await user?.reauthenticateWithCredential(emailCredential(user?.email , password))

                userCredential?.user.delete();
                console.log('User deleted successfully.');
            }

        } catch (error) {
            console.error('Error deleting user:', error);
        }

        handleCloseModal();
        setInputValue("")
    };



    return (
        <View style={{ flexDirection: 'row', backgroundColor: "white", elevation: 4 }}>
            <View style={styles.container}>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Password"
                                onChangeText={handleInputChange}
                                
                                value={inputValue}
                            />
                            <View style={styles.buttonsContainer}>
                                <Button title="Cancel" onPress={handleCloseModal}  color="green"  />
                                <Button title="Delete" onPress={()=>handleSubmit(inputValue)} color="red" />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

            <RBSheet
                height={170}

                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container: {
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                        elevation: 8,
                        backgroundColor: "white"
                    },
                    wrapper: {
                        backgroundColor: "rgba(10, 26, 47, 0.6)"
                    },
                    draggableIcon: {
                        backgroundColor: "#FFBF00"
                    }
                }}
            >
                <View style={{
                    flex: 1,
                    paddingTop: 7
                }} >

                    <TouchableOpacity onPress={() => Linking.openURL("mailto:fymidcapps@gmail.com")} activeOpacity={0.8} style={{ flexDirection: "row", paddingHorizontal: 15, paddingVertical: 7, alignItems: "center" }} >
                        <Text style={{ fontSize: 16, color: "black", paddingHorizontal: 7 }} >Contact Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://www.freeprivacypolicy.com/live/ccbac088-bcdf-404a-8bfe-bbf950514d81")} activeOpacity={0.8} style={{ flexDirection: "row", paddingHorizontal: 15, paddingVertical: 7, alignItems: "center" }} >
                        <Text style={{ fontSize: 16, color: "black", paddingHorizontal: 7 }} >Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOpenModal} activeOpacity={0.8} style={{ flexDirection: "row", paddingHorizontal: 15, paddingVertical: 7, alignItems: "center" }} >
                        <Text style={{ fontSize: 16, color: "red", paddingHorizontal: 7 }} >Delete My Account</Text>
                    </TouchableOpacity>

                </View>

            </RBSheet>


            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate(route.name);
                    }
                };

                return label === "HomeTab" ? (

                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}

                        style={{ flex: 1, alignItems: "center", height: 59, justifyContent: "center" }}
                    >

                        <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 10 }} >
                            <IonIcons style={{ color: isFocused ? 'black' : 'black' }} size={28} name={isFocused ? 'home' : 'home-outline'} />
                            <Octicons style={{ color: isFocused ? '#FFB100' : 'white' }} size={18} name='dash' />

                        </View>

                    </TouchableOpacity>
                ) : label === "Settings" ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={() => refRBSheet?.current?.open()}

                        style={{ flex: 1, alignItems: "center", height: 56, justifyContent: "center" }}
                    >


                        {label === "Settings" &&
                            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 10 }}  >

                                <IonIcons style={{ color: isFocused ? 'black' : 'black' }} size={28} name={isFocused ? 'settings' : 'settings-outline'} />
                                <Octicons style={{ color: isFocused ? '#FFB100' : 'white' }} size={18} name='dash' />
                            </View>
                        }

                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}

                        style={{ flex: 1, alignItems: "center", height: 56, justifyContent: "center" }}
                    >
                        {label === "ProfileTab" &&
                            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 10 }} >

                                <IonIcons style={{ color: isFocused ? 'black' : 'black' }} size={28} name={isFocused ? 'person' : 'person-outline'} />
                                <Octicons style={{ color: isFocused ? '#FFB100' : 'white' }} size={18} name='dash' />
                            </View>

                        }

                    </TouchableOpacity>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width:"70%",
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
        width: '70%',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 10,
      },
});

export default CustomtabBar