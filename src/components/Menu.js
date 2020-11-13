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
        <div>
          Use <b>W</b>, <b>A</b>, <b>S</b>, <b>D</b> or the arrow keys to control the pacman.
        </div>
      </div>
    </div>
  );
};

export default Menu;
