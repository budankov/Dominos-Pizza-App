import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from "@env";
import { makeRedirectUri } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";

export const useGoogleSignIn = () => {
  const redirectUri = makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(console.error);
    }
  }, [response]);

  return { promptAsync, request };
};

export const useFacebookSignIn = () => {
  const redirectUri = makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const credential = FacebookAuthProvider.credential(
        response.params.access_token
      );
      signInWithCredential(auth, credential).catch(console.error);
    }
  }, [response]);

  return { promptAsync, request };
};
