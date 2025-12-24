# Fruit Shop

Dự án cửa hàng trái cây được xây dựng với Next.js 16, React 19, và Tailwind CSS 4.

## Cấu trúc Project

```
fruit-shop/
├── app/                      # Next.js App Router
│   ├── (pages)/             # Route group cho các pages
│   │   ├── landing/         # Trang chủ
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx  # Loading state cho landing page
│   │   │   └── error.tsx    # Error boundary cho landing page
│   │   └── ordering/        # Trang đặt hàng
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   ├── layout.tsx           # Root layout với ErrorBoundary và LoadingOverlay
│   ├── page.tsx             # Redirect đến /landing
│   ├── error.tsx            # Global error handler
│   ├── loading.tsx          # Global loading state
│   └── not-found.tsx        # 404 page
├── components/              # React components
│   ├── ui/                  # UI components
│   │   ├── loading.tsx      # Loading spinner component
│   │   └── loading-overlay.tsx  # Full-screen loading overlay với context
│   └── error/               # Error handling components
│       ├── error-boundary.tsx   # Error boundary component
│       └── error-display.tsx    # Error display component
├── hooks/                   # Custom React hooks
│   └── use-async.ts         # Hook cho async operations
└── lib/                     # Utility functions
    ├── utils.ts             # General utilities (cn, formatCurrency, delay)
    └── errors.ts            # Custom error classes

```

## Features

### 1. Loading Components
- **Loading**: Component spinner với 3 kích thước (sm, md, lg)
- **LoadingOverlay**: Full-screen loading overlay với Context API
  - Sử dụng `useLoadingOverlay()` hook để show/hide loading
  - Tự động bao bọc app trong `LoadingOverlayProvider`

### 2. Error Handling
- **ErrorBoundary**: Component để bắt lỗi React
- **ErrorDisplay**: Component hiển thị lỗi với UI đẹp
- **Custom Error Classes**: 
  - `AppError`: Base error class
  - `ValidationError`: Lỗi validation
  - `NotFoundError`: Lỗi không tìm thấy
  - `NetworkError`: Lỗi mạng
- **Error Pages**: Mỗi route có `error.tsx` riêng để xử lý lỗi

### 3. Routes Structure
- Sử dụng Next.js App Router với route groups `(pages)`
- **LandingPage**: `/landing` - Trang chủ
- **OrderingPage**: `/ordering` - Trang đặt hàng
- Root `/` redirect đến `/landing`

### 4. Utilities & Hooks
- **cn()**: Merge class names (tương tự clsx)
- **formatCurrency()**: Format số tiền theo định dạng VND
- **delay()**: Utility để delay execution
- **useAsync()**: Hook để xử lý async operations với loading/error states

## Cách sử dụng

### Loading Overlay
```tsx
'use client';
import { useLoadingOverlay } from '@/components/ui/loading-overlay';

function MyComponent() {
  const { show, hide } = useLoadingOverlay();
  
  const handleSubmit = async () => {
    show();
    try {
      await fetchData();
    } finally {
      hide();
    }
  };
}
```

### useAsync Hook
```tsx
'use client';
import { useAsync } from '@/hooks/use-async';

function MyComponent() {
  const { data, loading, error, execute } = useAsync(fetchData);
  
  useEffect(() => {
    execute();
  }, []);
  
  if (loading) return <Loading />;
  if (error) return <ErrorDisplay error={error} />;
  return <div>{data}</div>;
}
```

### Custom Errors
```tsx
import { ValidationError, NotFoundError } from '@/lib/errors';
import { getErrorMessage } from '@/lib/errors';

try {
  if (!isValid) throw new ValidationError('Dữ liệu không hợp lệ');
} catch (error) {
  const message = getErrorMessage(error);
}
```

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Tech Stack

- **Next.js 16.1.1** - React framework
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **App Router** - Next.js routing system
