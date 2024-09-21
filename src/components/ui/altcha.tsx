import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

// Importing altcha package will introduce a new element <altcha-widget>
import 'altcha'

interface AltchaProps {
    ALTCHA_API_KEY: string;
    onStateChange?: (ev: Event | CustomEvent) => void;
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(({ ALTCHA_API_KEY, onStateChange }, ref) => {
    const widgetRef = useRef<HTMLElement>(null)
    const [value, setValue] = useState<string | null>(null)

    useImperativeHandle(ref, () => {
        return {
            get value() {
                return value;
            }
        };
    }, [value])

    useEffect(() => {
        const handleStateChange = (ev: Event | CustomEvent) => {
            if ('detail' in ev) {
                setValue(ev.detail.payload || null)
                onStateChange?.(ev)
            }
        }

        const { current } = widgetRef

        if (current) {
            current.addEventListener('statechange', handleStateChange)
            return () => current.removeEventListener('statechange', handleStateChange)
        }
    }, [onStateChange])

    /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/website-integration/#using-altcha-widget  */
    return (
        <altcha-widget
            ref={widgetRef}
            style={{
                '--altcha-max-width': '100%',
            }}
            challengeurl={`https://eu.altcha.org/api/v1/challenge?apiKey=${ALTCHA_API_KEY}`}
        ></altcha-widget>
    )
})

export default Altcha
