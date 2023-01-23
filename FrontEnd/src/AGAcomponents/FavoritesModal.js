const FavoritesModal = ({ open, onClose, getAdvices, deleteAdvice }) => {
  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <a className="modalBtn" onClick={onClose}>
          X
        </a>

        <h2 class="title"> My Favorites Advices </h2>
        <div>
          {getAdvices &&
            getAdvices.map((getAdvice, index) => {
              return (
                <div className="favAdvices" key={getAdvice._id}>
                  <ul>
                    <li className="favs">
                      {getAdvice.advice}
                      <button
                        onClick={() => {
                          deleteAdvice(getAdvice._id);
                        }}
                      >
                        x
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
