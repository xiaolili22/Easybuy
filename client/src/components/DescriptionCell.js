import React from "react";

function DescriptionCell({ description }) {
  const truncatedDescription = description.substring(0, 60);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  return (
    <span
      onClick={() => setShowFullDescription(!showFullDescription)}
      className="cursor-pointer"
    >
      {showFullDescription ? description : truncatedDescription}
      {description.length > 60 && !showFullDescription ? "..." : ""}
    </span>
  );
}

export default DescriptionCell;
