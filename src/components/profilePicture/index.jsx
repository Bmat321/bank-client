import { Image } from "react-native";

const ProfilePicture = ({ image, size = 50 }) => (
  <Image
    source={{ uri: image }}
    style={{
      height: size,
      width: size,
      borderRadius: size,
    }}
  />
);

export default ProfilePicture;
