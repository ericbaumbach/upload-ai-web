import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FileVideo, Github, Upload, Wand2 } from 'lucide-react'
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

export function App () {
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
            />

            <Textarea
              placeholder='Resultado gerado pela IA...'
              className='resize-none p-4 leading-relaxed'
              readOnly
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
          {/* Form video */}
          <form className='space-y-6'>
            <label
              htmlFor='video'
              className='border w-full flex flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-violet-700 hover:text-white rounded-md aspect-video cursor-pointer border-dashed text-sm'
            >
              <FileVideo className='w-4 h-4' />
              Selecione um vídeo
            </label>

            <input
              type='file'
              id='video'
              accept='video/mp4'
              className='sr-only'
            />

            <Separator />

            <div className='space-y-3'>
              <Label htmlFor='transcription_prompt'>
                Prompt de transcrição
              </Label>

              <Textarea
                id='transcription_prompt'
                className='h-20 leading-relaxed resize-none'
                placeholder='Inclua palavras chave mencionadas no vídeo separadas por vírgula (,)'
              />

              <Button type='submit' className='w-full'>
                Carregar vídeo
                <Upload className='w-4 h-4 ml-2' />
              </Button>
            </div>
          </form>
          {/* Form video */}

          <Separator />

          {/* Form options */}
          <form className='space-y-6'>
            {/* Prompt */}
            <div className='space-y-3'>
              <Label>Modelo</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='title'>Título do YouTube</SelectItem>
                  <SelectItem value='description'>Descrição do YouTube</SelectItem>
                </SelectContent>
              </Select>
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

              <Slider defaultValue={[0.5]} min={0} max={1} step={0.1} />

              <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                Quanto mais alto os valores, mais criatividade e espaço para
                inovação surgem, mesmo que alguns erros possam aparecer pelo
                caminho.
              </span>
            </div>
            {/* Temperatura */}

            <Separator />

            <Button type='submit' className='w-full'>
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
          {/* Form options */}
        </aside>
        {/* Settings */}
      </main>
    </div>
  )
}
