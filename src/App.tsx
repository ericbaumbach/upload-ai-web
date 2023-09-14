import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Github, Wand2 } from 'lucide-react'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './components/ui/select'
import { Slider } from './components/ui/slider'
import { VideoInputForm } from './components/video-input-form'
import { PromptSelect } from './components/prompt-select'
import { useState } from 'react'
import { useCompletion } from 'ai/react'

export function App () {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <div className='px-6 py-3 flex items-center justify-between border-b'>
        <div className='flex items-center'>
          <h1 className='text-xl font-bold'>upload.ai</h1>
          <img
            src='https://app.rocketseat.com.br/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FMaPbqTH9QiipZFKHLL4W&w=256&q=75'
            alt='upload.ai'
            className='w-32 ml-3'
          />
        </div>

        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>
            Desenvolvido por Eric para NLW IA
          </span>

          <Separator orientation='vertical' className='h-6' />

          <Button variant={'outline'} className='hover:bg-violet-700'>
            GitHub
            <Github className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </div>
      {/* Header */}

      {/* Prompts */}
      <main className='flex flex-1 p-6 gap-6'>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
              placeholder='Inclua o prompt para IA...'
              className='resize-none p-4 leading-relaxed'
              value={input}
              onChange={handleInputChange}
            />

            <Textarea
              placeholder='Resultado gerado pela IA...'
              className='resize-none p-4 leading-relaxed'
              readOnly
              value={completion}
            />
          </div>

          <p className='text-sm text-muted-foreground'>
            Lembre-se: Você pode utilizar a variável{' '}
            <code className='text-violet-700'>{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
          </p>
        </div>
        {/* Prompts */}

        {/* Settings */}
        <aside className='w-80 space-y-6'>
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          {/* Form options */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Prompt */}
            <div className='space-y-3'>
              <Label>Prompt</Label>

              <PromptSelect onPromptSelected={setInput} />
            </div>
            {/* Prompt */}

            {/* Modelo */}
            <div className='space-y-3'>
              <Label>Modelo</Label>

              <Select disabled defaultValue='gpt-3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className='block text-xs text-muted-foreground italic'>
                Você poderá customizar essa opção em breve
              </span>
            </div>
            {/* Modelo */}

            <Separator />

            {/* Temperatura */}
            <div className='space-y-3'>
              <Label>Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />

              <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                Quanto mais alto os valores, mais criatividade e espaço para
                inovação surgem, mesmo que alguns erros possam aparecer pelo
                caminho.
              </span>
            </div>
            {/* Temperatura */}

            <Separator />

            <Button disabled={isLoading} type='submit' className='w-full'>
              Executar
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </form>
          {/* Form options */}
        </aside>
        {/* Settings */}
      </main>
    </div>
  )
}
