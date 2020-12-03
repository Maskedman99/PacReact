import '../css/Menu.css';

const Menu = ({isGameOver}) => {
  return (
    <div className="menuContainer">
      <div className="menuSubcontainer">
        <div className="menuTitle">{isGameOver ? 'game over' : 'paused'}</div>
        <div className="menuInstructions">
          Press
          <b>
            <i> space </i>
          </b>
          to {isGameOver ? 'restart' : 'resume'} the game.
        </div>
        <div className="menuInstructions">
          Use <b>W</b>, <b>A</b>, <b>S</b>, <b>D</b> or the arrow keys to control the pacman.
        </div>
      </div>
    </div>
  );
};

export default Menu;
