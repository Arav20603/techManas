import Button from './Button'
import ProgressBar from './ProgressBar'

export default function StepWizard({ index, total, onPrev, onNext, children, canNext = true }) {
  const progress = ((index + 1) / total) * 100
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Question {index + 1} of {total}
        </div>
        <ProgressBar value={progress} />
      </div>
      {children}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} disabled={index === 0}>
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canNext}>
          {index === total - 1 ? 'See Results' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
