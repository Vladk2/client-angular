import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { TokenService } from './../guards/token.service';

describe('Interceptor', () => {

    const mockTokenService = new TokenService;
    const inter = new TokenInterceptor(mockTokenService);
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: TokenService,
                    useValue: mockTokenService
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                }]
        });
    });

    it('adds Authorization header', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

        http.get('/data').subscribe(
            response => {
                expect(response).toBeTruthy();
            }
        );

        const req = httpMock.expectOne(req =>
            req.headers.has('Authorization') && req.headers.get('Authorization')
            === `${mockTokenService.getToken()}`);
        expect(req.request.method).toEqual('GET');

        req.flush({ hello: 'world' });
        httpMock.verify();
    }));

    it('should create', () => {
        expect(inter).toBeTruthy();
    });

});
