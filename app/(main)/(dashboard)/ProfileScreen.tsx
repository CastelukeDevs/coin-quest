import { StyleSheet, Text, View } from "react-native";
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
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
