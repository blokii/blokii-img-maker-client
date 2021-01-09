/*import firebase from "firebase/app";
import { firebaseConfig } from "../../firebase.config";

require("firebase/functions");
firebase.initializeApp(firebaseConfig);

var functions = firebase.functions();
firebase.functions().useFunctionsEmulator("http://localhost:5001");

export async function downloadImageTriggered({ state }) {
  //functions.httpsCallable("unsplash-searchPhotos");
  console.log("paylod", state.imageOptions.downloadInfo.download_location);
  let downloadImageTriggered = functions.httpsCallable(
    "unsplash-downloadPhotoTriggered"
  );

  downloadImageTriggered({
    download_location: state.imageOptions.downloadInfo.download_location,
  })
    .then((result) => {
      console.log("result", result);
    })
    .catch((error) => {
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      var details = error.details;
      console.log("error", error);
    });
}
*/
