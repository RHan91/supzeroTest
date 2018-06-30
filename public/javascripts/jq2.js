

newFunction();

function newFunction() {
	(function () {

		const config = {
			apiKey: "AIzaSyDO-0pATErdhkenNZjSOoVZqDkzZXvrDX8",
			authDomain: "usertest-6a0c5.firebaseapp.com",
			databaseURL: "https://usertest-6a0c5.firebaseio.com",
			projectId: "usertest-6a0c5",
			storageBucket: "",
			messagingSenderId: "83402919820"
		};


		firebase.initializeApp(config);


		const database = firebase.database();
		const ref = database.ref();
		
		const currentProfileArray = [];
		var tempPro;
		
		//Added Elements
			//var jquery = require('jquery')
			//var Nightmare = require("nightmare")
			//const nightmare = Nightmare({ show: true })
			
			
			var targetItem = {
				name: "Tagless Tees",
				color: "white",
				size: "medium",
				type: "accessories",
			}
			
			var url
			var targetSite =[];
		


		//Get Elements
		const logInBtn = document.getElementById('btnLogIn');
		const signUpBtn = document.getElementById('btnSignUp');
		const signOutBtn = document.getElementById('btnLogOut');
		const submitSignUp = document.getElementById('btnSignUpSubmit');

		const logInEmail = document.getElementById('txtEmailLogIn');
		const logInPass = document.getElementById('txtPasswordLogIn');

		const preObject = document.getElementById('upNav');
		const leftObject = document.getElementById('leftpan');

		ref.child('users/').once('value',function(snapshot){
			var users = snapshot.val();
        	var keys = Object.keys(users);
			console.log(snapshot.val())
			console.log(keys.length);
			
			snapshot.forEach(function(child){
				var info = child.val();
				var line = document.createElement('li');
				var oList = document.getElementById('userList');
				line.innerText = 'NAME:'+ info.name + '    EMAIL:' + info.email;
				oList.append(line);
				var uCount = document.getElementById('userCount');
				uCount.innerText= keys.length;
			})
		})

				

		//FUNCTIONS
/*
		function gotData(data){
			var users = data.val();
			var keys = Object.keys(users);
			console.log(users);
			for (let i = 0; i < keys.length; i++) {
				var e = keys[i];
				var name = users[e].name;
				var email = users[e].email;
				console.log(name,email);
				var element = document.createElement('li', name + ": " + email);
				var oList = document.getElementById('userList');
				console.log("/// LIST ITEM:");
				console.log(oList.appendChild(element));
				console.log("/// LIST ITEM END:");

				
			}
			//leftObject.innerText = keys;
		}
*/
		function clearBox(elementID){
    		document.getElementById(elementID).innerHTML = "";
		}
		
		function addItemToProfile(newProfile) {
			// A Item Entry
			/*
			var postItem = {
				user: uid,
				itemName: itemname,
				itemType: itemType,
				itemColor: itemcolor,
				itemSize: itemsize,
				itemDelay: itemdelay
			};
			*/
			var postItem = newProfile;
			postItem.uid = firebase.auth().currentUser.uid;

			// Get pushKey for new item entry
			var newPostKey = ref.child('itemSched').push().key;

			// Write the new item entry to the schedule list and user list
			var updates = {};
			updates['/itemSched/' + newPostKey] = postItem;
			updates['/users/' + firebase.auth().currentUser.uid + '/' + 'zzItemLists/' + newPostKey] = postItem;

			return ref.update(updates);
		}
		
		//Add login event
		logInBtn.addEventListener('click', e => {
			//Get Email and Password
			const email = logInEmail.value;
			const password = logInPass.value
			const auth = firebase.auth();
			//Sign In
			const promise = auth.signInWithEmailAndPassword(email, password); 
			promise.catch(e => console.log(e.message));
		})

		//Sign In event
		signUpBtn.addEventListener('click', e => {
			suf.classList.add('hide');
			initChoiceID.classList.remove('hide');
		})

		//Sign Up event
		submitSignUp.addEventListener('click', e => {
						//Get Email and Password
			const email = signUpEmail.value;
			const password = signUpPassword.value;
			const name = signUpName.value;
			const address = signUpAddress.value;
			const zip = signUpZip.value;
			//const size = signUpSize.value;
			const auth = firebase.auth();
			
			//Sign Up
			const promise = auth.createUserWithEmailAndPassword(email, password);

				//Submit User Info to Database  
				promise.then(e => {					
						firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
							email: email,
							name: name,
							address: address,
							zip: zip,
							//size: size
						});					
				});
						
			//Clear page & load User Panel 
			suf.classList.add('hide');
			userPanel.classList.remove('hide');
			document.getElementById('signUpLogoDiv').classList.add('hide');
			document.getElementById('navID').classList.remove('hide');
            

		})

		//Real time listener
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if (firebaseUser) {
				console.log(firebaseUser);
				signOutBtn.classList.remove('hide');

				//display user name in panel navigation
				preObject.innerText = "CURRENT USER: " + firebaseUser.email;
				

				
			} else {
				console.log("Not Signed In")
				signOutBtn.classList.add('hide');
				preObject.innerText = '{NO USER SIGNED IN}';
			}
		})

		//User Log Off 
		signOutBtn.addEventListener('click', e => {
			firebase.auth().signOut();
		})
		
		//User Panel Menu
			//Get elements
			const uPBtn1 = document.getElementById('userPanel-left-btn1');
			const uPBtn2 = document.getElementById('userPanel-left-btn2');
			const uPBtn3 = document.getElementById('userPanel-left-btn3');
			const uPBtn4 = document.getElementById('userPanel-left-btn4');
			const uPBtn5 = document.getElementById('userPanel-left-btn5');
			
			
			//Menus 
			const createNewProfile = document.getElementById('newSchedProfile');
			const loadProfile = document.getElementById('loadSchedProfile'); 


			uPBtn1.addEventListener('click', e => {
				//Actions
				uPS1.classList.remove('hide');
				uPS2.classList.add('hide');
				uPS3.classList.add('hide');
				uPS4.classList.add('hide');
				uPS5.classList.add('hide');

				uPBtn1.classList.add('select');
				uPBtn2.classList.remove('select');
				uPBtn3.classList.remove('select');
				uPBtn4.classList.remove('select');
				uPBtn5.classList.remove('select');


				//Get Elements
				const currentUser = firebase.auth().currentUser.uid;
				const currentUserRef = firebase.database().ref('users/').child(currentUser);
				const uEmail = document.getElementById('upEmail');
				const uName = document.getElementById('upName');
				const uAddress = document.getElementById('upAddress');
				const uZip = document.getElementById('upZip');
				const uSize = document.getElementById('upSize');
				
				console.log(currentUser);
				//Display User Info
				currentUserRef.once('value',function(snapshot){
										
					
						console.log(snapshot.val());
						uEmail.value = snapshot.val().email;
						uName.value = snapshot.val().name;
						uAddress.value = snapshot.val().address;
						uZip.value = snapshot.val().zip;
						uSize.value = snapshot.val().size;
						
						 
						
						
					
				})

			});
			uPBtn2.addEventListener('click', e => {
				uPS1.classList.add('hide');
				uPS2.classList.remove('hide');
				uPS3.classList.add('hide');
				uPS4.classList.add('hide');
				uPS5.classList.add('hide');

				uPBtn2.classList.add('select');
				uPBtn1.classList.remove('select');
				uPBtn3.classList.remove('select');
				uPBtn4.classList.remove('select');
				uPBtn5.classList.remove('select');
			});
			uPBtn3.addEventListener('click', e => {
				uPS1.classList.add('hide');
				uPS2.classList.add('hide');
				uPS3.classList.remove('hide');
				uPS4.classList.add('hide');
				uPS5.classList.add('hide');

				uPBtn3.classList.add('select');
				uPBtn1.classList.remove('select');
				uPBtn2.classList.remove('select');
				uPBtn4.classList.remove('select');
				uPBtn5.classList.remove('select');
			});
			uPBtn4.addEventListener('click', e => {
				uPS1.classList.add('hide');
				uPS2.classList.add('hide');
				uPS3.classList.add('hide');
				uPS4.classList.remove('hide');
				uPS5.classList.add('hide');

				uPBtn4.classList.add('select');
				uPBtn1.classList.remove('select');
				uPBtn2.classList.remove('select');
				uPBtn3.classList.remove('select');
				uPBtn5.classList.remove('select');
			});
			uPBtn5.addEventListener('click', e => {
				uPS1.classList.add('hide');
				uPS2.classList.add('hide');
				uPS3.classList.add('hide');
				uPS4.classList.add('hide');
				uPS5.classList.remove('hide');

				uPBtn5.classList.add('select');
				uPBtn1.classList.remove('select');
				uPBtn2.classList.remove('select');
				uPBtn3.classList.remove('select');
				uPBtn4.classList.remove('select');
			});
			
			//BOT SCHEDULE
			const schedNew = document.getElementById('schedProfileName');
			const schedLoad = document.getElementById('schedProfileLoad');

			createNewProfile.addEventListener('click', e => {
				schedNew.classList.remove('hide');
				schedLoad.classList.add('hide');
				createNewProfile.classList.add('select');
				loadProfile.classList.remove('select');
				console.log("New Profile Create!");
			})

			loadProfile.addEventListener('click', e => {
				schedNew.classList.add('hide');
				schedLoad.classList.remove('hide');
				console.log("LOAD PROFILE");
				createNewProfile.classList.remove('select');
				loadProfile.classList.add('select');
				
			})

			//Profile Creator
			const addItemNameBtn = document.getElementById('itemNametoProfile');
			const addItemStyleBtn = document.getElementById("itemStyleToProfile");
			const addItemColorBtn = document.getElementById("itemColorToProfile");
			const addItemSizeBtn = document.getElementById('itemSizeToProfile');
			
			const editProfileBtn = document.getElementById('editProfileBtn');
			const saveProfileBtn = document.getElementById('saveProfileBtn');
			const newProfileBtn = document.getElementById('newSchedProfile');
			const loadProfileBtn = document.getElementById('loadSchedProfile');

			const itemTypetoAdd = document.getElementById('schedItemType');
			const itemTypePreview = document.getElementById('proPreItemType');

			const itemColortoAdd = document.getElementById('itemColorInput');
			const itemColorPreview = document.getElementById('proPreItemColor');

			const itemNametoAdd = document.getElementById('itemNameInput');
			const itemNamePreview = document.getElementById('proPreItemName');

			const itemSizetoAdd = document.getElementById('schedItemSize');
			const itemSizePreview = document.getElementById('proPreItemSize');

			const profileNameInput = document.getElementById('schedProfileName');
			const profilePreName = document.getElementById('profilePreName');

			const submitProfileBtn = document.getElementById('submitProfile');

			const itemSchedForm = document.getElementById('profileForm');

			const addAnotherItemDiv = document.getElementById('addAnotherItemID');
			const addAnotherItemBtn = document.getElementById('addAnotherItemBtn');

			const profilePreviewContent = document.getElementById('profilePreviewID');

			const currentProfileId = document.getElementById('currentProfileID');

			

			//Click events for schedule Nav Bar
				newProfileBtn.addEventListener('click', e => {
					editProfileBtn.classList.add('hide');
				})

				loadProfileBtn.addEventListener('click', e => {
					editProfileBtn.classList.remove('hide');
					saveProfileBtn.classList.add('hide');
					document.getElementById('schedContId').classList.add('hide');
				})
					//"Edit Profile Btn"
				editProfileBtn.addEventListener('click', e => {
					document.getElementById('schedContId').classList.remove('hide');
					editProfileBtn.classList.add('select');
					saveProfileBtn.classList.remove('select');
				})
					//"Create Profile Btn"
				saveProfileBtn.addEventListener('click', e => {
					console.log('SAVE PROFILE')
					profilePreName.innerText = "Profile Name: " + document.getElementById('schedProfileName').value;
					document.getElementById('schedContId').classList.remove('hide');
					editProfileBtn.classList.remove('select');
					saveProfileBtn.classList.add('select');
				})
					//Input field for Profile Name
				document.getElementById('schedProfileName').addEventListener('click', e => {
					saveProfileBtn.classList.remove('hide');
				})

				

			//Click events for Profile Item Add (STEP 1)
				addItemNameBtn.addEventListener('click', e => {
					console.log("ITEM NAME ADDED");
					itemNamePreview.innerText = "Item Name: " + itemNametoAdd.value;
					itemNametoAdd.classList.add('complete');
					addItemNameBtn.classList.add('complete');
					addItemNameBtn.innerText ="ADDED!";
				})

				addItemStyleBtn.addEventListener('click', e => {
					console.log("ITEM STYLE ADDED");
					itemTypePreview.innerText = "Item Type: " + itemTypetoAdd.value;
					itemTypetoAdd.classList.add('complete');
					addItemStyleBtn.classList.add('complete');
					addItemStyleBtn.innerText ="ADDED!";
				})

				addItemColorBtn.addEventListener('click', e => {
					console.log("ITEM COLOR ADDED");
					itemColorPreview.innerText = "Item Color: " + itemColortoAdd.value;
					itemColortoAdd.classList.add('complete');
					addItemColorBtn.classList.add('complete');
					addItemColorBtn.innerText ="ADDED!";
					
				})

				addItemSizeBtn.addEventListener('click', e => {
					console.log("ITEM SIZE ADDED");
					itemSizePreview.innerText = "Item Size: " + itemSizetoAdd.value;
					itemSizetoAdd.classList.add('complete');
					addItemSizeBtn.classList.add('complete');
					addItemSizeBtn.innerText ="ADDED!";
				})

			//Profile Submit Btn
				submitProfileBtn.addEventListener('click', e => {
					console.log('SUBMIT PROFILE');

					const profileName = profileNameInput.value;
					const itemName = itemNametoAdd.value;
					const itemType = itemTypetoAdd.value;
					const itemColor = itemColortoAdd.value;
					const itemSize = itemSizetoAdd.value;
					const date = Date.now();

					var newProfile = {
						profileName: profileName,
						itemName: itemName,
						itemType: itemType,
						itemColor: itemColor,
						itemSize: itemSize,
						date: date,	
					}
					
					//add newProfile to Firebase
					currentProfileArray.push(newProfile);
					console.log(currentProfileArray);
					firebase.database().ref('schedProfile/').push({
						profileName: profileName,
						itemName: itemName,
						itemType: itemType,
						itemColor: itemColor,
						creatorID: firebase.auth().currentUser.uid,
						date: date,
					});		
					
					itemSchedForm.classList.add('hide');
					addAnotherItemDiv.classList.remove('hide');
					profilePreviewContent.classList.add('hide');
					currentProfileId.classList.remove('hide');

					//add items to profile list
					var line2 = document.createElement('li');
					var Olist2 = document.getElementById('currentProfileItemsList');
					line2.innerText = "Item: " + newProfile.itemName + " || " + "Type: " + newProfile.itemType + " || " + "Color: " + newProfile.itemColor + " || " + "Size: " + newProfile.itemSize ;
					Olist2.append(line2);

					
				});

			//Add another Item button
				addAnotherItemBtn.addEventListener("click", e => {
				itemSchedForm.classList.remove('hide');
				profilePreviewContent.classList.remove('hide');
				

					//actions
					itemNametoAdd.classList.remove('complete');
					addItemNameBtn.classList.remove('complete');
					addItemNameBtn.innerText ="Add";
			
					itemTypetoAdd.classList.remove('complete');
					addItemStyleBtn.classList.remove('complete');
					addItemStyleBtn.innerText ="Add";

					itemColortoAdd.classList.remove('complete');
					addItemColorBtn.classList.remove('complete');
					addItemColorBtn.innerText ="Add";
				
					itemSizetoAdd.classList.remove('complete');
					addItemSizeBtn.classList.remove('complete');
					addItemSizeBtn.innerText ="Add";

				});
				


		//NEW CONTENT CONTAINER 
		
		
			//User Navigation Buttons 
				const uNavBtn1 = document.getElementById('nCNavBtn1');
				const uNavBtn2 = document.getElementById('nCNavBtn2');
				const uNavBtn3 = document.getElementById('nCNavBtn3');

			//User Navigation Contents
				const accountTab = document.getElementById('accountTabID');
				const supZeroTab = document.getElementById('supZeroTabID');

			//ACCOUNT TAB BUTTON	
				uNavBtn1.addEventListener('click', e => {
					console.log('NAV 1 CLICKED!')
					accountTab.classList.remove('hide');
					supZeroTab.classList.add('hide');
				});
			//SUPZERO TAB BUTTON
				uNavBtn2.addEventListener('click', e=> {
					console.log('SupZERO NAV CLICKED');
					supZeroTab.classList.remove('hide');
					accountTab.classList.add('hide');
				})	


			//SUPZERO CONTENT
				//	ADD ITEM PAGE

				const newProfile = {
					itemName : '',
					size : '',
					delay : '',
					color : '',
					type : '',
					billing : '',
					
				}

				function resetItem () {
					preKeywordBtn.innerText = "Keyword/ Item Name";
					preColorBtn.innerText = "Color";
					preDelayBtn.innerText = "Delay";
					preSizeBtn.innerText = 'Size';
					preTypeBtn.innerText = 'Type';
					supItemName.value = "";
					supItemColor.value = "";
					supItemDelay.value = '';
				}
					
					//Pre Buttons
						const preKeywordBtn =document.getElementById('preBtnKeyword');
						const preTypeBtn =document.getElementById('preBtnType');
						const preSizeBtn =document.getElementById('preBtnSize');
						const preColorBtn =document.getElementById('preBtnColor');
						const preDelayBtn =document.getElementById('preBtnDelay');
							//Actions
								preKeywordBtn.addEventListener('click', e=> {
									preKeywordBtn.classList.add('hide');
									document.getElementById('sClass1').classList.remove('hide');
								});
								preTypeBtn.addEventListener('click', e=> {
									preTypeBtn.classList.add('hide');
									document.getElementById('sClass2').classList.remove('hide');
									preColorBtn.classList.add('hide');
								});
								preSizeBtn.addEventListener('click', e=> {
									preSizeBtn.classList.add('hide');
									document.getElementById('sClass3').classList.remove('hide');
									preDelayBtn.classList.add('hide');
								});
								preColorBtn.addEventListener('click', e=> {
									preColorBtn.classList.add('hide');
									document.getElementById('subColorBox').classList.remove('hide');
									
									preTypeBtn.classList.add('hide');
								});

								preDelayBtn.addEventListener('click', e=> {
									document.getElementById("delayCont").classList.remove('hide');
									preDelayBtn.classList.add('hide');
									preSizeBtn.classList.add('hide');
								})

					//Inputs	
						const supItemName = document.getElementById('iNScID');
						const supItemColor = document.getElementById('sAIColor');
						const supItemDelay = document.getElementById('preBtnDelay1');
					
						
					//Profile Buttons
					 const createProfile = document.getElementById('createProfileBtn');	
					 const selectProfile = document.getElementById('selectProfileBtn')
					 //Actions

						//CREATE PROFILE BTN
						createProfile.addEventListener('click', e => {
							document.getElementById('billingInfoBox').classList.remove('hide');
						});

						//SELECT PROFILE BTN
						selectProfile.addEventListener('click', e=> {

							console.log(document.getElementById('proSelectMenuID').value);
							newProfile.bInfo = tempPro;
						})

					//Submit Button
						const supItemSubmit = document.getElementById('supItemSubmitBtn');

						 
					 	
						supItemSubmit.addEventListener('click', e=> {
							
							currentProfileArray.push(newProfile);
							console.log(currentProfileArray);
							var div = document.createElement('div');
							div.classList.add('sItemListTemplate');
						 	div.classList.add('set');

							var targetList = document.getElementById('targetList');
							div.innerText = "'" + newProfile.itemName + "' " + "(" + newProfile.type + ")      (" + newProfile.size + ") (" + newProfile.color + ") (" +  newProfile.delay + " second(s) ) (" + newProfile.billing + ")";
							targetList.append(div);
							addItemToProfile(newProfile);
							resetItem();

							
						})

					//Item Type Buttons
						const itemTypeAll = document.getElementById('supTypeBtn1');
						const itemTypeJackets = document.getElementById('supTypeBtn2');
						const itemTypeShirts = document.getElementById('supTypeBtn3');
						const itemTypeTops = document.getElementById('supTypeBtn4');
						const itemTypeSweatshirts = document.getElementById('supTypeBtn5');
						const itemTypePants = document.getElementById('supTypeBtn6');
						const itemTypeShorts = document.getElementById('supTypeBtn7');
						const itemTypeTShirts = document.getElementById('supTypeBtn8');
						const itemTypeHats = document.getElementById('supTypeBtn9');
						const itemTypeBags = document.getElementById('supTypeBtn10');
						const itemTypeAccs = document.getElementById('supTypeBtn11');
						const itemTypeSkate = document.getElementById('supTypeBtn12');

						function clearItemTypeSelected () {
							itemTypeAll.classList.remove('sell');
							itemTypeJackets.classList.remove('sell');
							itemTypeShirts.classList.remove('sell');
							itemTypeTops.classList.remove('sell');
							itemTypeSweatshirts.classList.remove('sell');
							itemTypePants.classList.remove('sell');
							itemTypeShorts.classList.remove('sell');
							itemTypeTShirts.classList.remove('sell');
							itemTypeHats.classList.remove('sell');
							itemTypeBags.classList.remove('sell');
							itemTypeAccs.classList.remove('sell');
							itemTypeSkate.classList.remove('sell');
						}

						//Click Actions	
								itemTypeAll.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeAll.classList.add('sell');
									preTypeBtn.innerText = "All";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'all';
								});
								itemTypeJackets.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeJackets.classList.add('sell');
									preTypeBtn.innerText = "Jackets";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'jackets';
								});
								itemTypeShirts.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeShirts.classList.add('sell');
									preTypeBtn.innerText = "Shirts";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'shirts';
								});
								itemTypeTops.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeTops.classList.add('sell');
									preTypeBtn.innerText = "Tops";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'tops';
								});
								itemTypeSweatshirts.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeSweatshirts.classList.add('sell');
									preTypeBtn.innerText = "Sweatshirts";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'sweatshirts';
								});
								itemTypePants.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypePants.classList.add('sell');
									preTypeBtn.innerText = "Pants";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'pants';
								});
								itemTypeShorts.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeShorts.classList.add('sell');
									preTypeBtn.innerText = "Shorts";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'shorts';
								});
								itemTypeTShirts.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeTShirts.classList.add('sell');
									preTypeBtn.innerText = "T-Shirts";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'tshirts';
								});
								itemTypeHats.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeHats.classList.add('sell');
									preTypeBtn.innerText = "Hats";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'hats';
								});
								itemTypeBags.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeBags.classList.add('sell');
									preTypeBtn.innerText = "Bags";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'bags';
								});
								itemTypeAccs.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeAccs.classList.add('sell');
									preTypeBtn.innerText = "Accessories";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'accessories';
								});
								itemTypeSkate.addEventListener('click', e => {
									clearItemTypeSelected ();
									itemTypeSkate.classList.add('sell');
									preTypeBtn.innerText = "Skate";
									document.getElementById('sClass2').classList.add('hide');
									preColorBtn.classList.remove('hide');
									preTypeBtn.classList.remove('hide');
									newProfile.type = 'skate';
								});



					
					//Item Size Buttons					
						const itemSizeSmall = document.getElementById('supSizeBtn1');
						const itemSizeMedium = document.getElementById('supSizeBtn2');
						const itemSizeLarge = document.getElementById('supSizeBtn3');
						const itemSizeXlarge = document.getElementById('supSizeBtn4');
						const itemSizeAll = document.getElementById('supSizeBtn5');

						function clearItemSizeSelected () {
							itemSizeSmall.classList.remove('sell');
							itemSizeMedium.classList.remove('sell');
							itemSizeLarge.classList.remove('sell');
							itemSizeXlarge.classList.remove('sell');
							itemSizeAll.classList.remove('sell');
						}
						//Click Actions
							itemSizeSmall.addEventListener('click', e=> {
								clearItemSizeSelected();
								itemSizeSmall.classList.add('sell');
								preSizeBtn.innerText = "Small";
								document.getElementById('sClass3').classList.add('hide');
								preDelayBtn.classList.remove('hide');
								preSizeBtn.classList.remove('hide');
								newProfile.size = 'small';
								console.log(newProfile);

							});
							itemSizeMedium.addEventListener('click', e=> {
								clearItemSizeSelected();
								itemSizeMedium.classList.add('sell');
								preSizeBtn.innerText = "Medium";
								document.getElementById('sClass3').classList.add('hide');
								preDelayBtn.classList.remove('hide');
								preSizeBtn.classList.remove('hide');
								newProfile.size = 'medium';
								console.log(newProfile);
							});
							itemSizeLarge.addEventListener('click', e=> {
								clearItemSizeSelected();
								itemSizeLarge.classList.add('sell');
								preSizeBtn.innerText = "Large";
								document.getElementById('sClass3').classList.add('hide');
								preDelayBtn.classList.remove('hide');
								preSizeBtn.classList.remove('hide');
								newProfile.size = 'large';
								console.log(newProfile);
							});
							itemSizeXlarge.addEventListener('click', e=> {
								clearItemSizeSelected();
								itemSizeXlarge.classList.add('sell');
								preSizeBtn.innerText = "Xlarge";
								document.getElementById('sClass3').classList.add('hide');
								preDelayBtn.classList.remove('hide');
								preSizeBtn.classList.remove('hide');
								newProfile.size = 'xlarge';
								console.log(newProfile);
							});
							itemSizeAll.addEventListener('click', e=> {
								clearItemSizeSelected();
								itemSizeAll.classList.add('sell');
								preSizeBtn.innerText = "ANY";
								document.getElementById('sClass3').classList.add('hide');
								preDelayBtn.classList.remove('hide');
								preSizeBtn.classList.remove('hide');
								newProfile.size = 'any';
								console.log(newProfile);
							});

					//Item Color Btns
						const itemColorSubmitBtn = document.getElementById('itemColorSubmitBtn');
						
						//Actions
							itemColorSubmitBtn.addEventListener('click', e => {
								preColorBtn.innerText = supItemColor.value;
								document.getElementById('subColorBox').classList.add('hide');
								preTypeBtn.classList.remove('hide');
								preColorBtn.classList.remove('hide');
								newProfile.color = supItemColor.value;
								console.log(newProfile);
							});

					//Item Name Btns
						const itemNameSubBtn = document.getElementById('iNameSubBtn');
						
						//Actions
						itemNameSubBtn.addEventListener('click', e => {
							preKeywordBtn.innerText = supItemName.value;
							preKeywordBtn.classList.remove('hide');
							document.getElementById('sClass1').classList.add('hide');
							newProfile.itemName = supItemName.value;
							console.log(newProfile);

						})
						
					//Item Delay Btns
						const itemDelaySubBtn = document.getElementById('delaySubBtn');
						
						//Actions
							itemDelaySubBtn.addEventListener('click', e=> {
								preDelayBtn.innerText = supItemDelay.value;
								document.getElementById('delayCont').classList.add('hide');
								preDelayBtn.classList.remove('hide');
								preSizeBtn.classList.remove('hide');
								newProfile.delay = supItemDelay.value;
								console.log(newProfile);
							})

				// Start Btn
						const startBtn = document.getElementById('supStartBtn');
						
						startBtn.addEventListener('click', e=> {
							
						})

				// PROFILE& BILLING INFO PAGE
					const proArray = [];

					function addProfile(proName){
						var x = document.getElementById('proSelectMenuID');
						var option = document.createElement('option');
						option.text = proName.value;
						option.value = tempPro;
						x.add(option);
					}
						//Btns
							const proSubmitBtn = document.getElementById('proSubmit');

						//Inputs
								const proName =document.getElementById('profileName1');
								const proUserName =document.getElementById('upName1');
								const proAddress =document.getElementById('upAddress1');
								const proZip =document.getElementById('upZip1');
								const proCreditCard =document.getElementById('upCreditCard');
								const proCreditExperation =document.getElementById('upCExp');
								const proCreditSecurity =document.getElementById('upCSec');
								const proEmail =document.getElementById('upEmail');
								const proNumber =document.getElementById('upNumber');

						// Actions
							
							
							//"PROFILE SUBMIT BTN"
							proSubmitBtn.addEventListener('click', e=> {
								console.log('hello');
								var pro = {
									proName : proName.value,
									proUserName : proUserName.value,
									proAddress : proAddress.value, 
									proZip : proZip.value,
									proCreditCard : proCreditCard.value,
									proCreditExperation : proCreditExperation.value,
									proCreditSecurity : proCreditSecurity.value,
									proEmail : proEmail.value, 
									proNumber : proNumber.value
								};
								//Add Billing Info to current profile Object.
								
								tempPro = pro;
								newProfile.billing = pro;
								
									// proArray.push(pro);

								//ADD Profile to Drop Down Menu
								addProfile(proName);
								console.log(tempPro);
								return newProfile;
							});		
	} ());
}
