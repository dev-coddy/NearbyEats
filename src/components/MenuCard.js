import { useState } from "react";

const MenuCard = ({ itemCard }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`menu-card ${isExpanded ? "expanded" : ""}`}>
      <div className="item-container">
        <div>
          <h3 className="menu-item-name">{itemCard?.name}</h3>
          <p className="menu-item-price">₹{itemCard?.price / 100}</p>

          <div className="desc-container">
            <p
              className={`menu-item-desc ${
                isExpanded ? "expanded" : "collapsed"
              }`}
            >
              {itemCard?.description}
            </p>
            <button className="read-more-btn" onClick={toggleExpand}>
              {isExpanded ? "...less" : "....more"}
            </button>
          </div>
        </div>

        <img
          className="menu-item-img"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_240,h_240/" +
            itemCard?.imageId
          }
          alt={itemCard?.name}
        />
      </div>
    </div>
  );
};

export default MenuCard;
