
//Dodawanie nowego użytkownika
function signup(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

//Logowanie sie za pomoca maila i hasla
function login(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;


    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error :" + errorMessage);

        // ...
      });

}


//Sprawdzenie Czy uzytkownik zalogowany
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("login_div").style.display = "none"
      document.getElementById("loggedin_div").style.display = "flex";
      document.getElementById("loggedout_div").style.display = "none";
    } else {
      // No user is signed in.
      document.getElementById("login_div").style.display = "flex"
      document.getElementById("loggedin_div").style.display = "none";
      document.getElementById("loggedout_div").style.display = "none";
    }
  });

//Wylogowanie
function logout(){
firebase.auth().signOut().then(function() {
    // Sign-out successful.
    document.getElementById("login_div").style.display = "none"
    document.getElementById("loggedin_div").style.display = "none";
    document.getElementById("loggedout_div").style.display = "flex";
  }).catch(function(error) {
    // An error happened.
  });
}

//Logowanie fb
function login_fb(){

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    function AcquireImage() { 
      DWObject.IfDisableSourceAfterAcquire = true; 
      DWObject.SelectSource(); 
      DWObject.OpenSource(); 
      DWObject.AcquireImage(); 
      } 
      function ReadBarcode(){
      if (!dbrObject) return;
      var barcodeImage = DWObject.GetImageURL(DWObject.CurrentImageIndexInBuffer);
      
      dbrObject.decode(barcodeImage).then(OnBarcodeReadSuccess, OnBarcodeReadFailure);
      }
      function OnBarcodeReadSuccess(results) {
      var strMsg = "";
      if(results.length > 0) {
      for (var i = 0; i < results.length; i++){
      var result = results[i];
      strMsg +="Index: " + i + "\n";
      strMsg += "Barcode Type: " + result.BarcodeFormatString + "\n";
      strMsg += "Barcode Value: " + result.BarcodeText + "\n"; 
      }
      console.log(strMsg);
      }
      else
      alert("No barcode(s) found.");
      }
      function OnBarcodeReadFailure(ex) {
      alert(ex.message || ex);
      }

      function scan(){
     //https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
        BarcodeReader.licenseKey = 't0068MgAAAAxT9peWqAbLNI2gDlg9yk8dqzhp5Me5BNCgFIg2p5X+8TPYghCr9cz6TNFlkmkpzOJelNHJaQMWGe7Bszoxoo4=';
        let scanner = new BarcodeReader.Scanner({
        htmlElement: document.getElementById('div-video-container'),
        onFrameRead: results => {console.log(results);},
        onNewCodeRead: (txt, result) => {alert(txt);}
     });
     scanner.open();
      }