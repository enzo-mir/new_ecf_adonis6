import React from 'react'
import { imageStore } from '../../../data/store/api_data.store.js'
import styles from '../../../css/admin.module.css'
import { useForm } from '@inertiajs/react'
const AdminImages = ({
  setDisplayModal,
  setImageData,
}: {
  setDisplayModal: (val: boolean) => void
  setImageData: (val: {
    id: number
    title: string
    description: string
    url: string
    adding: boolean
  }) => void
}) => {
  const [setImages, image] = imageStore((state) => [state.setImages, state.images])
  const { post, setData, data } = useForm<{ url: string }>({ url: '' })
  function imageAdd() {
    setImageData({
      id: 0,
      title: '',
      description: '',
      url: '',
      adding: true,
    })
    setDisplayModal(true)
  }
  function deleteImage() {
    post('/image/delete', { data })
  }
  function imageEdit(event: React.MouseEvent, title?: string, description?: string, id?: number) {
    const parentElement: ParentNode = (event.target as Node).parentNode!.parentNode!
    const imageTargeted: HTMLImageElement = parentElement.querySelector('img')!
    setImageData({
      id: id!,
      adding: false,
      url: imageTargeted.getAttribute('src')!,
      title: title || '',
      description: description || '',
    })
    setDisplayModal(true)
  }
  return (
    <>
      <h1>Galerie d&#39;images</h1>
      <div className={styles.images_galery}>
        {image?.map((images, id) => {
          return (
            <div key={id}>
              <img src={images.url} alt="plats du chef" />
              <p>
                Titre : {images.title}
                <br />
                <br />
                Description : {images.description}
              </p>
              <aside>
                <button
                  onClick={(e: React.MouseEvent) =>
                    imageEdit(e, images.title, images.description, images.id)
                  }
                >
                  Éditer
                </button>

                {data.url === images.url ? (
                  <div>
                    <p>êtes vous sûr ?</p>
                    <div>
                      <button onClick={() => deleteImage()}>Oui</button>
                      <button onClick={() => setData({ url: '' })}>Non</button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setData({ url: images.url })
                    }}
                  >
                    Supprimer
                  </button>
                )}
              </aside>
            </div>
          )
        })}
        <button onClick={imageAdd}>Ajouter +</button>
      </div>
    </>
  )
}

export default AdminImages
