import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../src/molecules/Card'
import { NavLink } from '../../src/molecules/NavLink'
import { CommandBox } from '../../src/molecules/CommandBox'
import { ThemeToggle } from '../../src/molecules/ThemeToggle'
import { Toast, ToastContainer } from '../../src/molecules/Toast'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '../../src/molecules/Modal'
import { Tabs, TabsList, TabsTab, TabsPanel } from '../../src/molecules/Tabs'
import { TestimonialBlock } from '../../src/molecules/TestimonialBlock/TestimonialBlock'
import { StatCard } from '../../src/molecules/StatCard/StatCard'
import { SectionLabel } from '../../src/molecules/SectionLabel/SectionLabel'
import { Button } from '../../src/atoms/Button'
import { Icon } from '../../src/atoms/Icon'
import type { Theme } from '../../src/hooks/useTheme'
import type { ModalSize } from '../../src/molecules/Modal'
import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'

interface MoleculesSectionProps {
  theme: Theme
  onThemeToggle: () => void
}

const controlBtnClass = (active: boolean) =>
  `px-2 py-1 text-xs rounded-full border transition-colors ${
    active
      ? 'bg-[var(--color-white)] text-[var(--color-bg)] border-[var(--color-white)]'
      : 'bg-transparent text-[var(--color-grey-400)] border-[var(--glass-border)] hover:border-[var(--glass-highlight)]'
  }`

export function MoleculesSection({ theme, onThemeToggle }: MoleculesSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<ModalSize>('md')
  const [showToast, setShowToast] = useState(false)
  const [toastVariant, setToastVariant] = useState<'default' | 'success' | 'error' | 'warning' | 'info'>('success')
  const [tabValue, setTabValue] = useState('tab1')
  const [tabVariant, setTabVariant] = useState<'underline' | 'pill'>('underline')

  const [cardVariant, setCardVariant] = useState<'default' | 'glass' | 'interactive'>('default')
  const [cardPadding, setCardPadding] = useState<'none' | 'sm' | 'md' | 'lg'>('md')

  const [navVariant, setNavVariant] = useState<'default' | 'underline' | 'pill'>('underline')
  const [navActive, setNavActive] = useState(true)

  return (
    <DemoSection id="molecules" title="Molecules" description="Combinations of atoms forming functional UI patterns for the mentorship platform.">
      {/* Cards */}
      <DemoBlock title="Card">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['default', 'glass', 'interactive'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setCardVariant(v)}
                className={controlBtnClass(cardVariant === v)}
              >
                {v}
              </button>
            ))}
            <span className="text-xs text-[var(--color-grey-400)] ml-4 mr-2">Padding:</span>
            {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setCardPadding(p)}
                className={controlBtnClass(cardPadding === p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="p-8 rounded-[32px] border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center">
            <div className="w-full max-w-sm">
              <Card variant={cardVariant} padding={cardPadding}>
                <CardHeader>
                  <CardTitle>{cardVariant.charAt(0).toUpperCase() + cardVariant.slice(1)} Card</CardTitle>
                  <CardDescription>
                    {cardVariant === 'glass' ? 'With backdrop blur' : cardVariant === 'interactive' ? 'Hover to see effects' : 'Basic border card'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-grey-400)]">
                    Cards contain insights on AI strategy and UX mentorship.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">Read More</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <CodeSnippet code={`<Card variant="${cardVariant}"${cardPadding !== 'md' ? ` padding="${cardPadding}"` : ''}>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button size="sm" variant="secondary">Action</Button>
  </CardFooter>
</Card>`} />
        </div>
      </DemoBlock>
      
      {/* Testimonial Block */}
      <DemoBlock title="TestimonialBlock">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Centered content with circular avatars and oversized gradient quotes.
        </p>
        <div className="p-8 rounded-[32px] border border-[var(--glass-border)] bg-[var(--glass-bg)] mb-4">
          <TestimonialBlock 
            quote="Amber identified a high-impact project that perfectly matched my skills..." 
            author="Nico Gao" 
            role="Senior Interaction Designer at Google" 
            avatarUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
          />
        </div>
        <CodeSnippet code={`<TestimonialBlock 
  quote="Amber identified a high-impact project that perfectly matched my skills..." 
  author="Nico Gao" 
  role="Senior Interaction Designer at Google" 
  avatarUrl="https://example.com/avatar.jpg" 
/>`} />
      </DemoBlock>
      
      {/* Stat Card & Section Label */}
      <DemoBlock title="Content Block Formatting">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Section labels for high-level structure and stat cards for high-impact numbers.
        </p>
        <div className="p-8 rounded-[32px] border border-[var(--glass-border)] bg-[var(--glass-bg)] mb-4">
          <SectionLabel>How I Work</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard number="20" suffix="+" label="Design Leadership" />
            <StatCard number="10" suffix="+" label="Years in Big Tech" />
            <StatCard number="200" suffix="k" label="Mentorship minutes" />
            <StatCard number="45" suffix="+" label="Speaking Engagements" />
          </div>
        </div>
        
        <CodeSnippet code={`<SectionLabel>How I Work</SectionLabel>
<div className="grid grid-cols-4 gap-4 mt-6">
  <StatCard number="20" suffix="+" label="Design Leadership" />
  <StatCard number="10" suffix="+" label="Years in Big Tech" />
</div>`} />
      </DemoBlock>

      {/* Tabs */}
      <DemoBlock title="Tabs">
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['underline', 'pill'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setTabVariant(v)}
                className={controlBtnClass(tabVariant === v)}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-[32px] border border-[var(--glass-border)] bg-[var(--glass-bg)]">
            <Tabs value={tabValue} onChange={setTabValue} variant={tabVariant}>
              <TabsList>
                <TabsTab value="tab1">Overview</TabsTab>
                <TabsTab value="tab2">Features</TabsTab>
                <TabsTab value="tab3">Settings</TabsTab>
              </TabsList>
              <TabsPanel value="tab1">
                <p className="text-sm text-[var(--color-grey-400)] py-4">
                  Mentorship overview with insights on career growth.
                </p>
              </TabsPanel>
              <TabsPanel value="tab2">
                <p className="text-sm text-[var(--color-grey-400)] py-4">
                  AI Strategy: integrating modern tools into your design workflow.
                </p>
              </TabsPanel>
              <TabsPanel value="tab3">
                <p className="text-sm text-[var(--color-grey-400)] py-4">
                  Resources panel. Access exclusive design frameworks.
                </p>
              </TabsPanel>
            </Tabs>
          </div>
        </div>
        <CodeSnippet className="mt-4" code={`<Tabs value={tab} onChange={setTab} variant="${tabVariant}">
  <TabsList>
    <TabsTab value="tab1">Overview</TabsTab>
    <TabsTab value="tab2">Features</TabsTab>
  </TabsList>
  <TabsPanel value="tab1">Overview content</TabsPanel>
  <TabsPanel value="tab2">Features content</TabsPanel>
</Tabs>`} />
      </DemoBlock>

      {/* Modal */}
      <DemoBlock title="Modal">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setModalSize(s)}
                className={controlBtnClass(modalSize === s)}
              >
                {s}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open Modal ({modalSize})
          </Button>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size={modalSize}>
          <ModalHeader>
            <div>
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>This is a description of the modal content.</ModalDescription>
            </div>
            <ModalCloseButton onClick={() => setModalOpen(false)} />
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-[var(--color-grey-400)]">
              Join the mentorship program to access 1-on-1 coaching, advanced design crits, and AI integration strategies.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>

        <CodeSnippet className="mt-4" code={`<Modal isOpen={open} onClose={() => setOpen(false)} size="${modalSize}">
  <ModalHeader>
    <div>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalDescription>Description text</ModalDescription>
    </div>
    <ModalCloseButton onClick={() => setOpen(false)} />
  </ModalHeader>
  <ModalBody>Content here</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Confirm</Button>
  </ModalFooter>
</Modal>`} />
      </DemoBlock>

      {/* Toast */}
      <DemoBlock title="Toast">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['default', 'success', 'error', 'warning', 'info'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setToastVariant(v)}
                className={controlBtnClass(toastVariant === v)}
              >
                {v}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={() => setShowToast(true)}>
            Show Toast ({toastVariant})
          </Button>
        </div>

        {showToast && (
          <ToastContainer position="top-right">
            <Toast
              variant={toastVariant}
              title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Toast`}
              description="Your mentorship session has been scheduled successfully."
              duration={4000}
              onDismiss={() => setShowToast(false)}
            />
          </ToastContainer>
        )}

        <CodeSnippet className="mt-4" code={`// Standalone
<Toast
  variant="${toastVariant}"
  title="Toast Title"
  description="Toast description"
  duration={5000}
  onDismiss={() => setShow(false)}
/>

// With useToast hook + Provider
const { toast } = useToast()
toast.${toastVariant === 'default' ? '' : toastVariant + '('}{ title: 'Done!', description: 'Action completed' }${toastVariant === 'default' ? '' : ')'}`} />
      </DemoBlock>

      {/* NavLink */}
      <DemoBlock title="NavLink">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--color-grey-400)] mr-2">Variant:</span>
            {(['default', 'underline', 'pill'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setNavVariant(v)}
                className={controlBtnClass(navVariant === v)}
              >
                {v}
              </button>
            ))}
            <button
              onClick={() => setNavActive(!navActive)}
              className={`${controlBtnClass(navActive)} ml-4`}
            >
              isActive
            </button>
          </div>

          {/* Preview */}
          <div className="p-8 rounded-[32px] border border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-wrap gap-6 items-center justify-center">
            <NavLink href="#" variant={navVariant} isActive={navActive}>Active Link</NavLink>
            <NavLink href="#" variant={navVariant}>Inactive Link</NavLink>
            <NavLink href="#" variant={navVariant} isActive={navActive}>
              <Icon name="external" size="sm" className="mr-1" />
              With Icon
            </NavLink>
          </div>

          <CodeSnippet code={`<NavLink href="/about" variant="${navVariant}"${navActive ? ' isActive' : ''}>
  About
</NavLink>`} />
        </div>
      </DemoBlock>

      {/* CommandBox */}
      <DemoBlock title="CommandBox">
        <div className="max-w-md">
          <CommandBox command="npm install amberbockel-ui" />
        </div>
        <CodeSnippet className="mt-4" code={`<CommandBox command="npm install amberbockel-ui" />`} />
      </DemoBlock>

      {/* ThemeToggle */}
      <DemoBlock title="ThemeToggle">
        <div className="flex gap-4 items-center">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} size="sm" />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} size="md" />
          <span className="text-sm text-[var(--color-grey-400)]">Current: {theme}</span>
        </div>
        <CodeSnippet className="mt-4" code={`const { theme, toggleTheme } = useTheme()
<ThemeToggle theme={theme} onToggle={toggleTheme} size="md" />`} />
      </DemoBlock>
    </DemoSection>
  )
}
