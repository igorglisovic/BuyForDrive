'use client'

import { getSignature, saveToDatabase } from '@app/_actions'
import {
  faClose,
  faCloudUpload,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadImages = () => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [isInfoOpened, setIsInfoOpened] = useState(false)

  const infoRef = useRef(null)
  const infoIconRef = useRef(null)

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
    console.log('slike2> ', acceptedFiles)
    if (acceptedFiles?.length) {
      const uniqueAcceptedFiles = acceptedFiles.filter(newFile => {
        return !files.some(existingFile => existingFile.name === newFile.name)
      })
      console.log('jeste> ', uniqueAcceptedFiles)

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
      console.log('slike> ', files)
      const trimmedFiles = files.slice(0, 3)

      if (trimmedFiles.length !== files.length) {
        setFiles(trimmedFiles)
      }
    }
  }, [files])

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
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  async function action() {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!file) return

      // get a signature using server action
      const { timestamp, signature } = await getSignature()

      // upload to cloudinary using the signature
      const formData = new FormData()

      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
      const data = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      }).then(res => res.json())

      console.log('data ', data)

      // write to database using server actions
      await saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id,
      })
    }
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
    <form action={action}>
      <h2 className="relative flex items-center max-w-fit text-xl font-semibold mb-2">
        Upload images
        <FontAwesomeIcon
          icon={faInfoCircle}
          ref={infoIconRef}
          className="text-sm ml-1 text-gray-600 cursor-pointer"
          onClick={handleInfo}
        />
        {isInfoOpened && (
          <div
            ref={infoRef}
            className="absolute z-10 bottom-[1.95rem] left-[84%] bg-white shadow-lg py-2 px-3 rounded-md"
          >
            <div className="absolute top-[92%] left-2 z-[1] border-l-[11px] border-l-transparent border-t-[11px] border-t-white border-r-[10px] border-r-transparent shadow-xs"></div>
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
          {files.map(file => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className="h-full w-full rounded-md object-contain"
              />
              <button
                type="button"
                className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-gray-400 transition-colors "
                onClick={() => removeFile(file.name)}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
              <p className="mt-2 text-[12px] font-medium text-stone-500">
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <ul className="mt-6 flex flex-col">
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="ml-auto mt-1 rounded-md border border-purple-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-purple-400 hover:text-white"
          >
            Upload to Cloudinary
          </button>
        </div>
      </section>
    </form>
  )
}

export default UploadImages
