import React, { useState } from "react";
import {
  Linking,
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  Vibration,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/Actions/AuthActions";
import LoginBg from "../../assets/loginBg.png";
export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Sound = useSelector((state) => state.SettingsReducer.Sound);
  const vibrateState = useSelector((state) => state.SettingsReducer.Vibration);
  const SubmitLogin = () => {
    dispatch(loginAction(username, password));
    if (vibrateState) {
      Vibration.vibrate();
    }
  };
  const uri = "https://qcs-dz.blogspot.com/";
  const devUri = "https://portfolio-blha5n9pm-dhia13.vercel.app/";
  return (
    <View style={styles.container}>
      <Image
        source={LoginBg}
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
      />
      <Text
        style={{
          fontSize: 26,
          paddingTop: 10,
          marginBottom: 20,
          textAlignVertical: "center",
          marginLeft: 5,
          color: "white",
        }}
      >
        Welcome! My name is Qcs
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dr Username</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="username"
          onChangeText={(val) => setUsername(val)}
          value={username}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={(val) => setPassword(val)}
          value={password}
          style={styles.input}
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <Pressable
        android_disableSound={Sound ? false : true}
        style={styles.loginButton}
        onPress={SubmitLogin}
      >
        <View
          style={{
            width: 300,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1877f2",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </View>
      </Pressable>
      <Pressable
        style={{ color: "black", marginTop: 20, fontSize: 24 }}
        onPress={() => Linking.openURL(uri)}
      >
        <Text style={{ fontSize: 24 }}>Get an account</Text>
      </Pressable>
      <Pressable
        style={{
          color: "black",
          marginTop: 20,
          fontSize: 24,
          position: "absolute",
          bottom: 4,
        }}
        onPress={() => Linking.openURL(uri)}
      >
        <Text
          style={{
            fontSize: 14,
            color: "green",
            fontWeight: "700",
            textDecorationLine: "underline",
          }}
        >
          Contact Dev
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#00ccd3",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    width: 300,
    backgroundColor: "white",
    color: "black",
  },
  buttonContainer: {
    width: 300,
    marginTop: 40,
    height: 60,
    shadowColor: "black",
  },
  label: {
    color: "white",
    paddingLeft: 11,
  },
});
