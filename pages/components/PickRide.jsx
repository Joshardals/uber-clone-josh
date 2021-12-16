import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../../lib/carList";
import axios from "axios";

const PickRide = ({ pickupCoordinates, dropoffCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?` +
          new URLSearchParams({
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
          })
      )
      .then((res) => {
        setRideDuration(res.data?.routes[0].duration / 2000);
      });
  }, [pickupCoordinates, dropoffCoordinates]);

  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>
        {carList.map((car, index) => {
          const { imgUrl, service, multiplier } = car;
          return (
            <Car key={index}>
              <CarImage src={imgUrl} />
              <CarDetails>
                <Service>{service}</Service>
                <Time>5 mins away</Time>
              </CarDetails>
              <Price>{"$" + (rideDuration * multiplier).toFixed(2)}</Price>
            </Car>
          );
        })}
      </CarList>
    </Wrapper>
  );
};
const Wrapper = tw.div`
    flex-1 overflow-y-scroll flex flex-col
`;
const Title = tw.div`
  text-gray-500 text-center text-xs py-2 border-b
`;
const CarList = tw.div`
  overflow-y-scroll
`;
const Car = tw.div`
  flex items-center p-4 space-x-4
`;
const CarImage = tw.img`
  h-14
`;

const CarDetails = tw.div`
  flex-1
`;
const Service = tw.div`
  font-medium
`;
const Time = tw.div`
  text-xs text-blue-500
`;
const Price = tw.div`
  text-sm
`;
export default PickRide;
