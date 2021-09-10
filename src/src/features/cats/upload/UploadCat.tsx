import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useState } from "react";
import UploadIcon from "./../../../components/icons/Upload";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { uploadCatAsync } from "./catsUploadSlice";

function UploadCat() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const status = useAppSelector(state => state.catsUpload.status)

  // setting file state in component rather than redux because redux shouldn't hold non-serializable values
  const [fileToUpload, setFileToUpload] = useState(null)
  const [imagePreviewSrc, setImagePreviewSrc] = useState(null)

  const clearFileToUpload = () => {
    setFileToUpload(null)
    setImagePreviewSrc(null)
  }

  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0]
    setFileToUpload(selectedFile)
    var reader = new FileReader()
    reader.onload = (event) => setImagePreviewSrc(event.target.result)
    reader.readAsDataURL(selectedFile)
  };

  return (
    <>
      <div className="columns is-vcentered">
        <div className="column is-half is-offset-one-quarter">
          <div className="card">
            <div className="card-content">
              {!fileToUpload && (
                <>
                  <p className="title">Upload your kitty cat</p>
                  <div className="field">
                    <div className="control">
                      <div className="file is-boxed is-justify-content-center">
                        <label className="file-label">
                          <input
                            className="file-input"
                            type="file"
                            accept="image/*"
                            placeholder="Upload an image"
                            onChange={chooseFile}
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <UploadIcon />
                            </span>
                            <span className="file-label">Choose a file…</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {fileToUpload && (
                <>
                  <p className="title">Preview</p>
                  <img src={imagePreviewSrc} className="is-flex mx-auto my-4" style={{ maxHeight: 500 }} />
                  <div className="control has-text-centered">
                    {fileToUpload && (
                      <div className="buttons">
                        <button
                          aria-label="Upload"
                          className="button is-primary is-fullwidth"
                          disabled={status !== 'idle'}
                          onClick={() =>
                            dispatch(uploadCatAsync({ fileToUpload, router }))
                          }
                        >
                          {status === 'idle' && (
                            <>Upload your kitty cat</>
                          )}
                          
                          {status !== 'idle' && (
                            <>Loading</>
                          )}
                        </button>
                        <button
                          aria-label="Remove"
                          className="button is-secondary is-fullwidth"
                          disabled={status !== 'idle'}
                          onClick={clearFileToUpload}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadCat;
