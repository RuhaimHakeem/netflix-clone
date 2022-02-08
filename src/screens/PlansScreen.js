import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [product, setProduct] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "customers", user.uid);
    const colRef = collection(docRef, "subscriptions");
    getDocs(colRef).then((querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    });
  }, [user.uid]);

  const details = query(
    collection(db, "products"),
    where("active", "==", true)
  );

  useEffect(() => {
    getDocs(details).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].price = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProduct(products);
    });
  }, []);

  console.log(product);
  console.log(subscription);

  const loadCheckout = (priceId) => {
    // const docRef = await collection(db, "customers")
    const docRef = doc(db, "customers", user.uid);
    const colRef = collection(docRef, "checkout_sessions");
    addDoc(colRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }).then((colRef) => {
      onSnapshot(colRef, async (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          alert(`An error occured: ${error.message}`);
        }
        if ({ sessionId }) {
          console.log(sessionId);
          const stripe = await loadStripe(
            "pk_test_51KMFeeI0Ynerx6amc2InIQR6j5lJV4NLkPiahVlO5yQk050MMypSYqe9BNg5bNPoIw88eB6IFhUHPeNEYkVVCeGD00wT8dU34m"
          );
          stripe.redirectToCheckout({ sessionId });
        }
      });
    });
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}{" "}
        </p>
      )}
      {Object.entries(product).map(([productId, productData]) => {
        //TODO
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen__plan--disabled"
            } planScreen__plan`}
          >
            <div className="planScreen__info">
              <h4>{productData.name}</h4>
              <h5>{productData.description}</h5>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.price.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
