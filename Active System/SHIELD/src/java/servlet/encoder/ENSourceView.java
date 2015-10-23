/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.encoder;

import dao.IntelligenceDAO;
import dao.SystemDAO;
import entity.Source;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import servlet.father.FatherServlet;

/**
 *
 * @author Dan Torres
 */
public class ENSourceView extends FatherServlet {

     protected void servletAction(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String srcIDString = request.getParameter("id");
        int srcID = Integer.parseInt(srcIDString);
        //Get Source
        IntelligenceDAO intlDAO = new IntelligenceDAO();
        Source src = intlDAO.GetSource(srcID);
        JSONObject srcJObj= new JSONObject(src);
        String srcJSON = srcJObj.toString();
        
        HttpSession session = request.getSession();
        session.setAttribute("sourceID", src.getId());
        
        ArrayList ctgyList = new SystemDAO().GetExcerptCategories();
        JSONArray ctgyJSON = new JSONArray(ctgyList);
        request.setAttribute("ctgyJSON", ctgyJSON);
        
        ArrayList clssList = new SystemDAO().GetSourceClasses();
        JSONArray clssJSON = new JSONArray(clssList);
        request.setAttribute("clssJSON", clssJSON);
        
        request.setAttribute("srcJSON", srcJSON);
        ServletContext context = getServletContext();
        RequestDispatcher dispatch = context.getRequestDispatcher("/encoder/en_source_view.jsp");
        dispatch.forward(request, response);

    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>


}
