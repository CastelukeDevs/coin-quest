import { StyleSheet, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Dimens from "@/constants/Dimens";
import Buttons from "@/components/commons/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { ColorScale } from "@/constants/Colors";
import { useAppDispatch } from "@/redux/store";
import {
  selectSignInStatus,
  signInUser,
  signOutUser,
} from "@/redux/reducers/defaultReducer";
import { useSelector } from "react-redux";
import Profile from "@/components/Illustration/Profile";

const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const isSignedIn = useSelector(selectSignInStatus);

  const authenticate = () => {
    if (isSignedIn) {
      dispatch(signOutUser());
    } else {
      dispatch(signInUser());
    }
  };
  return (
    <View
      style={{
        paddingTop: top + Dimens.medium,
        paddingHorizontal: Dimens.medium,
        flex: 1,
      }}
    >
      <Buttons
        label={isSignedIn ? "Sign Out" : "Sign In"}
        iconComponent={(prop) => (
          <Ionicons
            {...prop}
            name={isSignedIn ? "log-out-outline" : "log-in-outline"}
          />
        )}
        mode="faded-outlined"
        styles={
          isSignedIn
            ? {
                backgroundColor: ColorScale.red[50],
                borderColor: ColorScale.red[200],
              }
            : {}
        }
        onPress={authenticate}
      />

      <Profile
        style={{ height: 300, position: "absolute", bottom: 20, left: 20 }}
        color={ColorScale.gray[500]}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
