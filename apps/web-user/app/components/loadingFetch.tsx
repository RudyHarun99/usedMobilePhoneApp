export default function LoadingFetch () {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="inline-block w-8 h-8 border-4 rounded-full spinner-border animate-spin">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};