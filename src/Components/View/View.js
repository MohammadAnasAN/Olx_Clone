import React, { useEffect, useState, useContext } from 'react';
import '../View/View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/firebaseContext';
import { useHistory } from 'react-router-dom';
import ConfirmationModal from '../Modal/modal'

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const currentUserID = firebase.auth().currentUser?.uid;

  useEffect(() => {
    if (postDetails && postDetails.userId) {
      console.log('Post Details:', postDetails); // Debugging statement
      const { userId } = postDetails;
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach(doc => {
          console.log('User Details:', doc.data()); // Debugging statement
          setUserDetails(doc.data());
        });
      }).catch(error => {
        console.error('Error fetching user details:', error); // Debugging statement
      });
    }
  }, [firebase, postDetails]);

  const handleDelete = async () => {
    try {
      await firebase.firestore().collection('products').doc(postDetails.id).delete();
      console.log('Product deleted successfully');
      history.push('/'); // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  if (!postDetails) {
    return <div className="centerLoading">Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span> {postDetails.createdAt 
    ? new Date(postDetails.createdAt).toDateString() 
    : 'Invalid Date'}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
        {currentUserID === postDetails.userId && (
          <>
            <button onClick={() => setShowModal(true)} className="deleteButton">Delete Product</button>
            {showModal && (
              <ConfirmationModal 
                onConfirm={handleDelete} 
                onCancel={() => setShowModal(false)} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default View;
