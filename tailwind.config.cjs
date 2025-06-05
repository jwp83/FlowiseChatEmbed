// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

function rem2px(input, fontSize = 16) {
    if (input == null) {
        return input
    }
    switch (typeof input) {
        case 'object':
            if (Array.isArray(input)) {
                return input.map((val) => rem2px(val, fontSize))
            }
            // eslint-disable-next-line no-case-declarations
            const ret = {}
            for (const key in input) {
                ret[key] = rem2px(input[key], fontSize)
            }
            return ret
        case 'string':
            return input.replace(/(\d*\.?\d+)rem$/, (_, val) => `${parseFloat(val) * fontSize}px`)
        case 'function':
            return eval(input.toString().replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val) * fontSize}px`))
        default:
            return input
    }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        ...rem2px(defaultTheme),
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    }
                }
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out'
            }
            ,// 여기를 추가합니다.
            typography: ({ theme }) => ({ // theme 함수를 사용하여 다른 테마 값에 접근 가능
                DEFAULT: { // 기본 prose 스타일 설정
                    css: {
                        // 순서가 있는 목록의 기본 번호 매김 제거
                        'ol': {
                            'list-style-type': 'square'
                        }
                    },
                },
            }),
        }
    },
    plugins: [
      require('@tailwindcss/typography')
    ]
}
