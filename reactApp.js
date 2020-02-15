class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    };

    this.shotSound = new Audio("./assets/sounds/BOUNCE+1.wav");
    this.scoreSound = new Audio("./assets/sounds/cheer.wav");
  }

  shotHandler = team => {
    const teamStatsKey = `${team}TeamStats`;
    let score = this.state[teamStatsKey].score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;
      setTimeout(() => {
        this.scoreSound.play();
      }, 200);
    }

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score
      }
    }));
  };

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }));
  };

  render() {
    return (
      <div className="Game">
        <ScoreBoard
          homeTeamStats={this.state.homeTeamStats}
          visitingTeamStats={this.state.visitingTeamStats}
        />
        <h1>Welcome to {this.props.venue}</h1>
        <div className="stats">
          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shotHandler("home")}
          />

          <div className="versus">
            <h1>VS</h1>
            <strong>Resets:</strong> {this.state.resetCount}
            <button onClick={this.resetGame}>Reset Game</button>
          </div>

          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shotHandler("visiting")}
          />
        </div>
      </div>
    );
  }
}

function Team(props) {
  let shotPercentageDiv;
  if (props.stats.shots) {
    const shotPercentage = Math.round(
      (props.stats.score / props.stats.shots) * 100
    );
    shotPercentageDiv = (
      <div>
        <strong>Shooting %: {shotPercentage}</strong>
      </div>
    );
  }
  return (
    <div className="Team">
      <h2>{props.name}</h2>

      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>

      <div>
        <strong>Shots:</strong> {props.stats.shots}
      </div>

      <div>
        <strong>Score:</strong> {props.stats.score}
      </div>

      {shotPercentageDiv}
      <button onClick={props.shotHandler}>Shoot!</button>
    </div>
  );
}

function ScoreBoard(props) {
  return (
    <div className="ScoreBoard">
      <div className="teamStats">
        <h3>HOME</h3>
        <h3>{props.homeTeamStats.score}</h3>
      </div>
      <div>
        <h3>SCOREBOARD</h3>
      </div>
      <div className="teamStats">
        <h3>VISITORS</h3>
        <h3>{props.visitingTeamStats.score}</h3>
      </div>
    </div>
  );
}
function App(props) {
  const raiders = {
    name: "Red Raiders",
    logoSrc: "./assets/raiders.jpeg"
  };

  const devils = {
    name: "Blue Devils",
    logoSrc: "./assets/blue devils.png"
  };

  const bulldogs = {
    name: "Bulldogs",
    logoSrc: "./assets/bulldogs.jpeg"
  };

  const ravens = {
    name: "Ravens",
    logoSrc: "./assets/ravens.png"
  };

  return (
    <div className="App">
      <Game venue="XL Center" homeTeam={raiders} visitingTeam={devils} />
      <Game venue="Sheridan Arena" homeTeam={bulldogs} visitingTeam={ravens} />
    </div>
  );
}
// Deafault App component that all other compents are rendered through

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
