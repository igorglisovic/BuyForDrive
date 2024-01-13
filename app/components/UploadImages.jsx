'use client'

import { useLoadingBarContext } from '@app/store/loading-bar'
import {
  faClose,
  faCloudUpload,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadImages = ({ setImagesArray, files, setFiles, carImages }) => {
  const [rejected, setRejected] = useState([])
  const [isInfoOpened, setIsInfoOpened] = useState(false)
  const [isLoadingBarIncreased, setIsLoadingBarIncreased] = useState(false)
  const [isLoadingBarDecreased, setIsLoadingBarDecreased] = useState(false)
  const [initialRender, setInitialRender] = useState(true)

  const infoRef = useRef(null)
  const infoIconRef = useRef(null)

  const { increaseLoadingBar, decreaseLoadingBar } = useLoadingBarContext()

  const duplicateValidator = file => {
    const isDuplicate = files.some(item => item.name === file.name) || false

    if (isDuplicate) {
      return {
        code: 'name-too-large',
        message: `The image is already uploaded!`,
      }
    }
    return null
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      const uniqueAcceptedFiles = acceptedFiles.filter(newFile => {
        return !files.some(existingFile => existingFile.name === newFile.name)
      })

      setFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(prevFiles => [...prevFiles, ...rejectedFiles])
    }
  }, [])

  useEffect(() => {
    const isLimitReached = files.length >= 3 ? true : false

    if (isLimitReached) {
      const trimmedFiles = files.slice(0, 3)

      if (trimmedFiles.length !== files.length) {
        setFiles(trimmedFiles)
      }
    }
  }, [files])

  // Update loading bar
  useEffect(() => {
    if (initialRender) {
      // Skip the code block on the first render
      setInitialRender(false)
      return
    }

    if (files.length && !isLoadingBarIncreased) {
      increaseLoadingBar(5)
      setIsLoadingBarIncreased(true)
      setIsLoadingBarDecreased(false)
    }

    if (!files.length && !isLoadingBarDecreased) {
      decreaseLoadingBar(5)
      setIsLoadingBarDecreased(true)
      setIsLoadingBarIncreased(false)
    }
  }, [files, isLoadingBarIncreased, isLoadingBarDecreased])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 3,
    onDrop,
    validator: duplicateValidator,
    disabled: files.length === 3 ? true : false,
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files =>
      files.filter(file => {
        if (file.name) {
          return file.name !== name
        }
        if (file.public_id) {
          return file.public_id !== name
        }
      })
    )
  }

  const removeRejected = name => {
    setRejected(files =>
      files.filter(({ file }) => file.name !== name && file.public_id !== name)
    )
  }

  const handleInfo = () => {
    setIsInfoOpened(prev => !prev)
  }

  useEffect(() => {
    const handleDocumentClick = event => {
      if (
        infoRef.current &&
        infoIconRef.current &&
        !infoRef.current.contains(event.target) &&
        !infoIconRef.current.contains(event.target)
      ) {
        setIsInfoOpened(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <div>
      <h2 className="relative flex items-center max-w-fit text-xl font-semibold mb-2">
        Upload images
        <FontAwesomeIcon
          icon={faInfoCircle}
          ref={infoIconRef}
          className="text-sm ml-1 text-gray-600 cursor-pointer"
          width="14px"
          onClick={handleInfo}
        />
        {isInfoOpened && (
          <div
            ref={infoRef}
            className="absolute z-10 bottom-[1.95rem] left-[84%] bg-white shadow-lg py-2 px-3 rounded-md"
          >
            <div className="absolute top-[92%] left-2 -z-10 border-l-[11px] border-l-transparent border-t-[11px] border-t-white border-r-[10px] border-r-transparent shadow-xs"></div>
            <p className="text-xs font-normal whitespace-nowrap">
              Maximum image size: 1MB
            </p>
          </div>
        )}
      </h2>
      <div
        {...getRootProps({
          className: `border ${
            isDragActive ? 'bg-gray-100' : 'bg-white'
          } border-neutral-200 p-16 cursor-pointer`,
        })}
      >
        <input {...getInputProps({ name: 'file' })} />
        <div className="flex flex-col items-center justify-center gap-1 ">
          <FontAwesomeIcon
            className="text-2xl text-gray-600"
            icon={faCloudUpload}
            width="30px"
          />
          {isDragActive ? (
            <p className="text-sm">Drop the images here ...</p>
          ) : (
            <p className="text-sm">
              Drag & drop images here, or click to select images
            </p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-3">
        {/* Accepted files */}
        <h3 className="flex justify-between title mt-2 border-b pb-1 text-base font-medium text-stone-600">
          <span>Preview</span>
          <span className="font-normal">{files.length}/3</span>
        </h3>
        <ul className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {files.map((file, i) => (
            <li key={i} className="relative h-32 rounded-md shadow-lg">
              <Image
                src={
                  file.preview ||
                  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${file.version}/${file.public_id}`
                }
                alt={file.name || 'car image'}
                width={100}
                height={100}
                onLoad={() => {
                  file.preview && URL.revokeObjectURL(file.preview)
                }}
                className="h-full w-full rounded-md object-contain"
              />
              <button
                type="button"
                className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-gray-400 transition-colors "
                onClick={() => removeFile(file.name || file.public_id)}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
              <p className="mt-2 text-[12px] font-medium text-stone-500">
                {file.name || `car-image-${i + 1}.jpg`}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <ul className="mt-12 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-sm font-medium text-stone-500">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default UploadImages
