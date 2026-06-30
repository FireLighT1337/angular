let message;
message = "abc";

const endsWithC = (<string>message).endsWith("c"); // more common
const alternativeWay = (message as string).endsWith("c");
