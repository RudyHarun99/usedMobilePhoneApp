type ErrorProps = {
    message: string;
}

export default function ErrorFetch ({ message }: ErrorProps) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-red-500">
                <p>Error: {message}</p>
            </div>
        </div>
    );
};
