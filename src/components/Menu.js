import '../css/Menu.css';

const Menu = () => {
  return (
    <div className="menuContainer">
      <div className="menuSubcontainer">
        <div className="menuTitle">paused</div>
        <div>
          Press
          <b>
            <i> space </i>
          </b>
          to resume the game.
        </div>
      </div>
    </div>
  );
};

export default Menu;
