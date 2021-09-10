import { useRouter } from "next/dist/client/router";
import { useState } from "react";

import { useAppDispatch } from "../../../app/hooks";
import { uploadCatAsync } from "./catsUploadSlice";

function UploadCat() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // setting file state in component rather than redux because redux shouldn't hold non-serializable values
  const [fileToUpload, setFileToUpload] = useState(null);

  return (
    <>
      <div className="columns is-vcentered" style={{ height: "80vh" }}>
        <div className="column is-half is-offset-one-quarter">
          <div className="card">
            <div className="card-content">
              <p className="title">Upload your kitty cat</p>
              <div className="field">
                <div className="control">
                  <div className="file has-name is-medium">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        accept="image/*"
                        placeholder="Upload an image"
                        onChange={(event) =>
                          setFileToUpload(event.target.files[0])
                        }
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">Choose a file…</span>
                      </span>
                      <span className="file-name">
                        Screen Shot 2017-07-29 at 15.54.25.png
                      </span>
                    </label>
                  </div>
                  {/* <input
                    className="input"
                    type="file"
                    accept="image/*"
                    placeholder="Upload an image"
                    onChange={(event) => setFileToUpload(event.target.files[0])}
                  /> */}
                </div>
                <p className="help">Please upload an image of a cat</p>
              </div>

              <div className="control has-text-centered">
                <button
                  aria-label="Upload"
                  className="button is-primary"
                  onClick={() =>
                    dispatch(uploadCatAsync({ fileToUpload, router }))
                  }
                >
                  Upload your kitty cat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadCat;
