import { connect } from "react-redux";
import { increment, decrement, reset } from "../redux/actions/counterActions";

function Counter({ count, increment, decrement, reset }) {
  return (
    <div className="counter">
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <button onClick={reset}>RESET</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    count: state.counter.count
  };
}

const mapDispatchToProps = {
  increment,
  decrement,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
