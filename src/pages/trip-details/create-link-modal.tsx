import { X, Tag, Link2 } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void
}


export function CreateLinkModal({
    closeCreateLinkModal,
}: CreateLinkModalProps) {

   

    const { tripId } = useParams()

    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const url = data.get('url')?.toString()

        await api.post(`/trips/${tripId}/links`, {
            title,
            url
        })

        window.document.location.reload()
        closeCreateLinkModal()
    }


    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className=' text-lg font-semibold'>Cadastrar link</h2>
                        <button onClick={closeCreateLinkModal}><X className='size-5 text-zinc-400' /></button>
                    </div>
                    <p className='text-sm text-zinc-400 text-start'>Todos convidados podem visualizar as atividades.</p>
                </div>

                <form onSubmit={createLink} className='space-y-3'>
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className='text-zinc-400 size-5' />
                        <input type="text"
                            name='title'
                            placeholder='Título do link?'
                            className='bg-transparent text-lg outline-none placeholder-zinc-400 flex-1' />
                    </div>
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-1 items-center gap-2">
                        <Link2 className='text-zinc-400 size-5' />
                        <input type="url"
                            name='url'
                            placeholder='URL'
                            className='bg-transparent text-lg outline-none placeholder-zinc-400 flex-1 '
                            />
                    </div>
                    <Button size="full" type='submit'>
                        Salvar atividade
                    </Button>
                </form>

            </div>


        </div>
    )
}