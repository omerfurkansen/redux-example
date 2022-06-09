import { useEffect } from "react";
import { connect } from "react-redux";
import { getCats } from "../redux/actions/catActions";

function Cat({ loading, error, data, getCats }) {
  useEffect(() => {
    getCats();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <div>{data}</div>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.cat.loading,
    error: state.cat.error,
    data: state.cat.data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getCats: () => dispatch(getCats())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cat);

