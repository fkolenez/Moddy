import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Homepage() {
    return (
        <>
            <div className="relative mb-4">
                <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
                <h1 className="text-center text-2xl font-bold">Homepage</h1>
            </div>

            <hr />

            <div className="content-center align-center">
                <Card className="mt-5 p-1">
                    <CardHeader>
                        <CardTitle>Bem-vindo!</CardTitle>
                        <CardDescription>Estamos felizes em ter você aqui.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Este é o seu sistema. Explore as funcionalidades disponíveis no menu lateral e aproveite a experiência!</p>
                    </CardContent>
                    <CardFooter>
                        <p>Se precisar de ajuda, entre em contato com o suporte.</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
