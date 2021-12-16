import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import axios from "axios";
import PickRide from "./components/PickRide";

const confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropOffCoordinates] = useState([0, 0]);

  const getPickUpCoordinates = (pickup) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
          new URLSearchParams({
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            limit: 1,
          })
      )
      .then((res) => {
        setPickupCoordinates(res?.data.features[0].center);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDropOffCoordinates = (dropoff) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
          new URLSearchParams({
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            limit: 1,
          })
      )
      .then((res) => {
        setDropOffCoordinates(res?.data.features[0].center);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPickUpCoordinates(pickup);
    getDropOffCoordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <YourRides>
        <PickRide
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
        </ConfirmButtonContainer>
      </YourRides>
    </Wrapper>
  );
};

export default confirm;

const Wrapper = tw.div`
    flex h-screen flex-col relative
`;
const ButtonContainer = tw.div`
    bg-white absolute z-10 rounded-full mx-4 my-4 shadow-lg
`;
const BackButton = tw.img`
    h-full
`;
const YourRides = tw.div`
    flex-1 flex flex-col h-1/2
`;
const ConfirmButtonContainer = tw.div`
    border-t-2
`;
const ConfirmButton = tw.div`
  bg-black cursor-pointer text-white my-4 mx-4 py-4 px-4
  text-center text-xl
`;
